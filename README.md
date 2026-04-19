# インド料理 バワナ — 公式ウェブサイト

東京都小平市鷹の台の本格インド・ネパール料理店「バワナ」の公式HPです。

---

## ディレクトリ構成

```
bawana-hp/
├── index.html          静的フロントエンド（メインHTML）
├── style.css           スタイルシート
├── main.js             インタラクション（タブ・スクロール等）
├── api/
│   ├── contact.js      /api/contact  （問い合わせ受付 → 将来MongoDB保存）
│   └── reserve.js      /api/reserve  （予約受付 → 将来MongoDB保存）
├── lib/
│   └── mongodb.js      MongoDB Atlas 接続モジュール（将来使用）
├── assets/images/      店舗・料理写真（オーナー提供予定）
├── .env.example        環境変数テンプレート（実際の値はVercel管理画面に設定）
├── vercel.json         Vercel 設定
├── package.json        依存関係（mongodb パッケージ）
└── README.md           このファイル
```

---

## デプロイ構成

| 役割 | サービス |
|---|---|
| コード管理 | GitHub（このリポジトリ） |
| 本番公開 | Vercel（GitHub連携で自動デプロイ） |
| データベース | MongoDB Atlas（将来追加） |

### Vercel 初回セットアップ手順

1. [vercel.com](https://vercel.com) にログイン（GitHubアカウントで可）
2. **Add New Project** → `bawana-hp` リポジトリを選択
3. 設定はデフォルトのまま **Deploy** をクリック
4. 以降は `git push` のたびに自動でデプロイされる

### 自動デプロイの流れ

```
コード編集 → git add → git commit → git push → Vercel が自動検知 → 約30秒で本番反映
```

---

## 環境変数の設定

`.env` ファイルは**GitHubにコミットしない**。  
Vercel 管理画面（Settings → Environment Variables）に直接入力する。

| 変数名 | 説明 | 設定タイミング |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas の接続文字列 | MongoDB追加時 |
| `MONGODB_DB` | データベース名（例: `bawana`） | MongoDB追加時 |
| `NOTIFY_EMAIL` | 問い合わせ通知の送信先メール | 通知機能追加時 |

---

## 今後の拡張ロードマップ

### Phase 1（現在）— 静的サイト公開
- [x] HTML/CSS/JS による静的HP
- [x] Vercel で自動デプロイ
- [ ] 実際の店舗写真・メニュー価格の反映

### Phase 2 — MongoDB Atlas 接続

**手順:**

1. [MongoDB Atlas](https://www.mongodb.com/atlas) でクラスター作成（無料枠あり）
2. 接続文字列を取得 → Vercel の環境変数 `MONGODB_URI` に設定
3. `lib/mongodb.js` の接続モジュールがそのまま使える
4. `api/contact.js` と `api/reserve.js` の TODO コメント部分を実装する

**保存データのコレクション設計（案）:**

```
bawana DB
├── contacts       お問い合わせ履歴
│   ├── name, email, message, createdAt
├── reservations   予約リクエスト
│   ├── name, date, time, people, phone, status, createdAt
└── menu           メニュー情報（将来の管理画面用）
    ├── category, name, description, price, available
```

### Phase 3 — 管理画面
- オーナーがメニュー・営業時間を編集できる簡易管理画面
- 予約一覧の確認・ステータス変更
- 追加場所: `admin/` ディレクトリ（パスワード保護必須）

---

## 店舗情報（確認待ち項目）

- [ ] 営業時間
- [ ] 定休日
- [ ] 実際のメニュー価格
- [ ] 店舗・料理写真（`assets/images/` に追加）

---

## 開発メモ

- フォントは Google Fonts（Playfair Display / Noto Serif JP / Noto Sans JP）
- カラー: 背景 `#0d0a07` / アクセント `#c8890a`（サフランゴールド）
- Google Maps iframe は座標 `35.72239, 139.46098` で埋め込み済み
- ホットペッパー予約リンク: https://www.hotpepper.jp/strJ001215557/
