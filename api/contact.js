import { connectToDatabase } from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body ?? {};

  // バリデーション
  const errors = {};
  if (!name || name.trim().length < 1)   errors.name    = 'お名前を入力してください';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = '有効なメールアドレスを入力してください';
  if (!message || message.trim().length < 10) errors.message = 'メッセージを10文字以上で入力してください';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const entry = {
    name:    name.trim(),
    email:   email.trim(),
    message: message.trim(),
    createdAt: new Date(), // Date型で保存してMongoDBのDate indexが効くようにする
  };

  try {
    const { db } = await connectToDatabase();
    await db.collection('contacts').insertOne(entry);
    console.log('[contact] saved to MongoDB:', entry.email);
  } catch (err) {
    // DB障害時は503を返し、フォーム送信者に電話を案内する
    console.error('[contact] DB error:', err.message);
    return res.status(503).json({
      ok: false,
      error: 'データベースへの保存に失敗しました。お電話（042-312-1275）にてお問い合わせください。',
    });
  }

  return res.status(200).json({
    ok: true,
    message: 'お問い合わせを受け付けました。近日中にご連絡いたします。',
  });
}
