-- ============================================================
-- 天邪鬼 Amanojoker — 初期スキーマ
-- Supabase SQL Editor に貼り付けて実行するか、
-- `supabase db push` で適用する。
-- ============================================================

-- お知らせ
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  category text not null default 'info', -- info / release / live / media
  published_at timestamptz not null default now(),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 日記(マークダウン)
create table if not exists public.diary_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body text not null,
  author text default 'ウノ太一',
  mood text,
  cover_kanji text, -- カバーに大きく出す一文字
  published_at timestamptz not null default now(),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 楽曲紹介
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  reading text,
  description text, -- マークダウン可
  catch_copy text,  -- 一言キャッチコピー
  release text,     -- 収録作品名
  track_no int,
  duration text,
  tags text[] not null default '{}',
  eggs_url text,
  youtube_url text,
  accent_color text default '#e63a21',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ライブ情報
create table if not exists public.live_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  open_time text,
  start_time text,
  venue text not null,
  area text,
  ticket_price text,
  note text,
  link_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- コンタクトフォームの受信箱
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  body text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
--   公開コンテンツ: 誰でも閲覧可(公開済みのみ) / 書き込みはログインユーザーのみ
--   コンタクト: 誰でも投稿可 / 閲覧・削除はログインユーザーのみ
-- ============================================================

alter table public.news enable row level security;
alter table public.diary_posts enable row level security;
alter table public.songs enable row level security;
alter table public.live_events enable row level security;
alter table public.contact_messages enable row level security;

-- news
create policy "news_public_read" on public.news
  for select using (is_published = true);
create policy "news_admin_all" on public.news
  for all to authenticated using (true) with check (true);

-- diary_posts
create policy "diary_public_read" on public.diary_posts
  for select using (is_published = true);
create policy "diary_admin_all" on public.diary_posts
  for all to authenticated using (true) with check (true);

-- songs
create policy "songs_public_read" on public.songs
  for select using (is_published = true);
create policy "songs_admin_all" on public.songs
  for all to authenticated using (true) with check (true);

-- live_events
create policy "lives_public_read" on public.live_events
  for select using (is_published = true);
create policy "lives_admin_all" on public.live_events
  for all to authenticated using (true) with check (true);

-- contact_messages
create policy "contact_public_insert" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "contact_admin_read" on public.contact_messages
  for select to authenticated using (true);
create policy "contact_admin_delete" on public.contact_messages
  for delete to authenticated using (true);
