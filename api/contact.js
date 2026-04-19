// /api/contact — お問い合わせ受付エンドポイント
//
// 現状: MongoDB未接続のダミー実装。バリデーション・ログのみ動作。
// 将来: connectToDatabase() のコメントを外すだけで MongoDB 保存に切り替わる。

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body ?? {};

  // バリデーション
  const errors = {};
  if (!name || name.trim().length < 1) errors.name = 'お名前を入力してください';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = '有効なメールアドレスを入力してください';
  if (!message || message.trim().length < 10) errors.message = 'メッセージを10文字以上で入力してください';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  };

  // Vercel Functions ログに記録（管理画面 → Logs で確認可能）
  console.log('[contact] received:', JSON.stringify(entry));

  // --- MongoDB 追加時はここを有効にする ---
  // const { db } = await connectToDatabase();
  // await db.collection('contacts').insertOne(entry);
  // ----------------------------------------

  return res.status(200).json({
    ok: true,
    message: 'お問い合わせを受け付けました。近日中にご連絡いたします。',
    // 開発確認用に受信内容をエコーバック（本番では削除してよい）
    debug: entry,
  });
}
