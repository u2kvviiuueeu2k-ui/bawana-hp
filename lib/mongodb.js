// MongoDB Atlas 接続モジュール
// 使い方: const { db } = await connectToDatabase();
//
// Vercel Serverless Functions はリクエストごとにコールドスタートするため、
// 接続をグローバルにキャッシュしてコネクション枯渇を防ぐ。

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'bawana';

if (!uri) {
  throw new Error('環境変数 MONGODB_URI が設定されていません');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
