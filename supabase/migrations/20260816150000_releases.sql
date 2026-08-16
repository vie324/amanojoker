-- ============================================================
-- 天邪鬼 Amanojoker — リリース(作品)テーブル + 楽曲の配信リンク
-- 20260816000000_init.sql 適用後に実行する。
-- ============================================================

-- 作品(シングル / EP / アルバム)
create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type text not null default 'single', -- single / ep / album / demo
  release_date date,
  cover_url text,      -- ジャケット画像 (/images/releases/... または外部URL)
  apple_url text,      -- Apple Music アルバムURL
  eggs_url text,
  youtube_url text,    -- 代表MVなど
  description text,
  tracks text[] not null default '{}',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.releases enable row level security;

create policy "releases_public_read" on public.releases
  for select using (is_published = true);
create policy "releases_admin_all" on public.releases
  for all to authenticated using (true) with check (true);

-- 楽曲に Apple Music トラックURLを追加
alter table public.songs add column if not exists apple_url text;
