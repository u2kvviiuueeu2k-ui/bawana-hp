// /api/reserve — 予約受付エンドポイント（プレースホルダー）
//
// 将来の実装:
//   1. リクエストボディ（name, date, time, people, phone）をバリデーション
//   2. connectToDatabase() で MongoDB に接続
//   3. db.collection('reservations').insertOne(data) で保存
//   4. 必要なら SMS / LINE / メールで通知

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // TODO: MongoDB 接続後にここを実装する
  // const { db } = await connectToDatabase();
  // await db.collection('reservations').insertOne({ ...req.body, status: 'pending', createdAt: new Date() });

  return res.status(200).json({
    ok: true,
    message: '予約リクエストを受け付けました（現在準備中です）',
  });
}
