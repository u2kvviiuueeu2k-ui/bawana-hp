// /api/contact — お問い合わせ受付エンドポイント（プレースホルダー）
//
// 将来の実装:
//   1. リクエストボディ（name, email, message）をバリデーション
//   2. connectToDatabase() で MongoDB に接続
//   3. db.collection('contacts').insertOne(data) で保存
//   4. 必要なら通知メール送信

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // TODO: MongoDB 接続後にここを実装する
  // const { db } = await connectToDatabase();
  // await db.collection('contacts').insertOne({ ...req.body, createdAt: new Date() });

  return res.status(200).json({
    ok: true,
    message: 'お問い合わせを受け付けました（現在準備中です）',
  });
}
