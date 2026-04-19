// MongoDB Atlas 接続モジュール
// Vercel Serverless Functions はウォームリクエスト間で同一プロセスを再利用するため
// グローバルキャッシュで接続を使い回し、コネクション枯渇を防ぐ。

import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // 環境変数チェックはインポート時ではなく呼び出し時に行う。
  // こうしないとモジュールロード時点でクラッシュし、405応答すら返せなくなる。
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'bawana';

  if (!uri) {
    throw new Error('環境変数 MONGODB_URI が設定されていません');
  }

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
