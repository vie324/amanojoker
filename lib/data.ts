import { getPublicClient } from "./supabase/public";
import { seedDiary, seedLives, seedNews, seedReleases, seedSongs } from "./seed";
import type { DiaryPost, LiveEvent, News, Release, Song } from "./types";

/**
 * 公開ページのデータ取得層。
 * Supabase 未設定・接続失敗時はシードデータにフォールバックするので、
 * env なしのローカル/プレビューでもサイトが完全な状態で表示される。
 */

async function fetchOr<T>(fallback: T, fn: (sb: NonNullable<ReturnType<typeof getPublicClient>>) => Promise<T | null>): Promise<T> {
  const sb = getPublicClient();
  if (!sb) return fallback;
  try {
    const result = await fn(sb);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getNews(limit?: number): Promise<News[]> {
  const items = await fetchOr(seedNews, async (sb) => {
    const { data, error } = await sb
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data as News[];
  });
  return limit ? items.slice(0, limit) : items;
}

export async function getReleases(): Promise<Release[]> {
  return fetchOr(seedReleases, async (sb) => {
    const { data, error } = await sb
      .from("releases")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data as Release[];
  });
}

export async function getSongs(): Promise<Song[]> {
  return fetchOr(seedSongs, async (sb) => {
    const { data, error } = await sb
      .from("songs")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data as Song[];
  });
}

export async function getSong(slug: string): Promise<Song | null> {
  const sb = getPublicClient();
  if (!sb) return seedSongs.find((s) => s.slug === slug) ?? null;
  try {
    const { data, error } = await sb
      .from("songs")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return (data as Song | null) ?? null;
  } catch {
    return seedSongs.find((s) => s.slug === slug) ?? null;
  }
}

export async function getLives(): Promise<LiveEvent[]> {
  return fetchOr(seedLives, async (sb) => {
    const { data, error } = await sb
      .from("live_events")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false });
    if (error) throw error;
    return data as LiveEvent[];
  });
}

export async function getDiaryPosts(limit?: number): Promise<DiaryPost[]> {
  const items = await fetchOr(seedDiary, async (sb) => {
    const { data, error } = await sb
      .from("diary_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data as DiaryPost[];
  });
  return limit ? items.slice(0, limit) : items;
}

export async function getDiaryPost(slug: string): Promise<DiaryPost | null> {
  const sb = getPublicClient();
  if (!sb) return seedDiary.find((p) => p.slug === slug) ?? null;
  try {
    const { data, error } = await sb
      .from("diary_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return (data as DiaryPost | null) ?? null;
  } catch {
    return seedDiary.find((p) => p.slug === slug) ?? null;
  }
}
