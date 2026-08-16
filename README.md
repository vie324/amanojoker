# 天邪鬼 AMANOJOKER — Official Website

→NEW OLD← ROCK'N'ROLL MUSIC。温故知新型ロックバンド「天邪鬼 Amanojoker」のオフィシャルサイト。

- **フロントエンド**: Next.js 15 (App Router) + Tailwind CSS v4 + Motion (Framer Motion)
- **バックエンド**: Supabase (PostgreSQL + Auth + RLS)
- **デプロイ**: Vercel
- **コンテンツ管理**: `/admin` のブラウザ管理画面から、お知らせ・日記・楽曲紹介・ライブ情報・受信メッセージを編集

> Supabase を設定しなくてもサイトは動きます(内蔵のシードデータを表示)。
> 環境変数を設定した時点で、自動的に Supabase のコンテンツに切り替わります。

---

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | ホーム(ヒーロー、お知らせ、ABOUT、楽曲、ライブ、日記、フォロー) |
| `/profile` | プロフィール(コンセプト、メンバー、沿革) |
| `/music` | 楽曲紹介一覧 / `/music/[slug]` 楽曲詳細(ライナーノーツ) |
| `/live` | ライブ情報(今後の予定 + 年別アーカイブ) |
| `/diary` | 日記一覧 / `/diary/[slug]` 記事(Markdown対応) |
| `/contact` | コンタクトフォーム(Supabase 受信箱に保存)+ X / 旧フォームへのリンク |
| `/admin` | 管理画面(要ログイン)— お知らせ / 日記 / 楽曲 / ライブ / 受信箱 の作成・編集・削除 |

---

## デプロイ手順 (Vercel + Supabase)

### 1. Supabase プロジェクトを作る

1. [supabase.com](https://supabase.com) で新規プロジェクトを作成(無料枠でOK、リージョンは Tokyo 推奨)
2. ダッシュボードの **SQL Editor** を開き、次の2ファイルを順に貼り付けて実行:
   1. `supabase/migrations/20260816000000_init.sql`(テーブルとRLSポリシー)
   2. `supabase/seed.sql`(初期コンテンツ。旧サイトの情報 + サンプル記事)
3. **Settings → API** から以下2つを控える:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` キー → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. 管理者アカウントを作る

1. **Authentication → Users → Add user** でメールアドレスとパスワードを登録
   (「Auto Confirm User」にチェック)
2. **重要**: **Authentication → Sign In / Providers → Email** で
   **「Allow new users to sign up」を OFF** にする。
   これを切らないと第三者が自分でアカウントを作って管理画面に入れてしまいます。

### 3. Vercel にデプロイ

1. このリポジトリを GitHub に置いたまま [vercel.com](https://vercel.com) → **Add New → Project** でインポート
   (フレームワークは自動で Next.js と認識されます)
2. **Environment Variables** に以下を設定:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | 手順1で控えた Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 手順1で控えた anon キー |

3. **Deploy** を押す。以上。

デプロイ後、`https://<あなたのドメイン>/admin` にアクセスし、手順2のアカウントでログインすると
コンテンツを編集できます。公開ページは60秒ごとに再生成(ISR)されるので、編集は約1分以内に反映されます
(管理画面からの保存時は即時再検証も走ります)。

---

## ローカル開発

```bash
npm install
cp .env.example .env.local   # Supabase を使う場合のみ。無くても動く
npm run dev                  # http://localhost:3000
```

## コンテンツ管理のヒント

- **日記・楽曲紹介の本文は Markdown 対応**(`## 見出し`、`> 引用`、`- リスト` など)
- 日記の「表紙の一文字」は、カードや記事背景に大きく透かしで入る漢字1字(例: 鬼・唄・夜)
- 楽曲の「アクセントカラー」は詳細ページの差し色になります
- ライブは日付が今日以降なら自動で **UPCOMING** 扱いになりホームにも表示されます
- コンタクトフォームの受信は管理画面の「受信箱」へ。返信は記載のメールアドレス宛にどうぞ

## シードデータについて

`supabase/seed.sql`(と、その内容を写した `lib/seed.ts`)には、旧ホームページ・eggs の
公開情報(バンド概要・受賞歴・ライブ履歴・曲名)をもとにした初期データと、
デザイン確認用の **サンプル日記・サンプル紹介文** が入っています。
文面はすべて管理画面から書き換え・削除できます。

## 技術メモ

- Supabase 未設定・接続失敗時は `lib/seed.ts` に自動フォールバックするため、
  プレビューやローカルでは環境変数なしでフルデザインが確認できます
- RLS: 公開コンテンツは誰でも閲覧可(公開済みのみ)、書き込みはログインユーザーのみ。
  コンタクトフォームは誰でも投稿可・閲覧はログインユーザーのみ
- 縦書きの装飾テキストは `components/TateText.tsx` で1文字ずつ組んでいます
  (Google Fonts の日本語 Web フォントは縦書きメトリクスが削られているため)
