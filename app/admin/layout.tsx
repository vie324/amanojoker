import type { Metadata } from "next";
import Link from "next/link";
import SealLogo from "@/components/SealLogo";
import { getServerClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: { default: "管理画面", template: "%s | 天邪鬼 管理画面" },
  robots: { index: false, follow: false },
};

const ADMIN_NAV = [
  { href: "/admin", label: "ダッシュボード", en: "DASHBOARD" },
  { href: "/admin/news", label: "お知らせ", en: "NEWS" },
  { href: "/admin/diary", label: "日記", en: "DIARY" },
  { href: "/admin/releases", label: "リリース", en: "RELEASES" },
  { href: "/admin/songs", label: "楽曲", en: "SONGS" },
  { href: "/admin/live", label: "ライブ", en: "LIVE" },
  { href: "/admin/messages", label: "受信箱", en: "INBOX" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await getServerClient();

  // Supabase 未設定 → セットアップ案内
  if (!sb) {
    return (
      <div className="flex min-h-svh items-center justify-center px-5 pt-20 pb-10">
        <div className="max-w-lg border border-line bg-kuro/40 p-8 md:p-10">
          <SealLogo className="h-12 w-12 text-shu" />
          <h1 className="mt-6 font-mincho text-2xl font-extrabold text-washi">
            管理画面はまだ眠っています
          </h1>
          <p className="mt-4 text-xs leading-loose text-smoke">
            Supabase の環境変数が設定されていません。
            <code className="mx-1 bg-kuro-2 px-1.5 py-0.5 font-mono text-[11px] text-washi">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            と
            <code className="mx-1 bg-kuro-2 px-1.5 py-0.5 font-mono text-[11px] text-washi">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            を設定すると、お知らせ・日記・楽曲・ライブ情報をブラウザから管理できるようになります。
            手順はリポジトリの README をどうぞ。
          </p>
          <Link
            href="/"
            className="mt-8 inline-block font-mono text-xs tracking-[0.25em] text-shu hover:text-shu-bright"
          >
            ← サイトに戻る
          </Link>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await sb.auth.getUser();

  // 未ログイン(= /admin/login) はシェルなしで表示
  if (!user) {
    return <div className="min-h-svh">{children}</div>;
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-7xl flex-col px-5 pt-24 pb-16 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-3">
          <SealLogo className="h-9 w-9 text-shu" />
          <div>
            <p className="font-display text-lg tracking-[0.2em] text-washi">ADMIN</p>
            <p className="font-mono text-[9px] tracking-[0.3em] text-smoke">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:text-washi"
          >
            サイトを見る →
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="border border-line-2 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-shu hover:text-shu"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-10 md:flex-row">
        <nav className="md:w-48 md:shrink-0" aria-label="管理メニュー">
          <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
            {ADMIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline gap-2.5 border border-transparent px-3 py-2 transition-colors hover:border-line hover:bg-kuro/60"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-shu">
                    {item.en}
                  </span>
                  <span className="text-xs text-smoke group-hover:text-washi">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
