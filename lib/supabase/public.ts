import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * 公開ページ用のクライアント(cookie 非依存 → 静的生成/ISR 可能)。
 * 環境変数が未設定なら null を返し、呼び出し側はシードデータへフォールバックする。
 */
export function getPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
