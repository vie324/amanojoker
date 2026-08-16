import { redirect } from "next/navigation";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { getServerClient } from "./supabase/server";

/** 管理画面用: 未ログインなら /admin/login へ飛ばす */
export async function requireUser(): Promise<{ sb: SupabaseClient; user: User }> {
  const sb = await getServerClient();
  if (!sb) redirect("/admin/login");
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");
  return { sb, user };
}

/** datetime-local / date 入力値を ISO に。空なら now */
export function parseDateTime(value: FormDataEntryValue | null): string {
  const s = String(value ?? "").trim();
  if (!s) return new Date().toISOString();
  const d = new Date(s.length === 10 ? `${s}T12:00:00` : s);
  return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

/** ISO → datetime-local の value 形式 (YYYY-MM-DDTHH:mm) */
export function toInputDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9぀-ヿ一-龯]+/g, "-")
      .replace(/^-+|-+$/g, "") || `post-${Date.now()}`
  );
}
