import Link from "next/link";
import { requireUser } from "@/lib/admin";
import { fmtDot } from "@/lib/format";

export default async function AdminDashboard() {
  const { sb } = await requireUser();

  const [news, diary, releases, songs, lives, messages] = await Promise.all([
    sb.from("news").select("id", { count: "exact", head: true }),
    sb.from("diary_posts").select("id", { count: "exact", head: true }),
    sb.from("releases").select("id", { count: "exact", head: true }),
    sb.from("songs").select("id", { count: "exact", head: true }),
    sb.from("live_events").select("id", { count: "exact", head: true }),
    sb
      .from("contact_messages")
      .select("id, name, subject, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "お知らせ", en: "NEWS", count: news.count ?? 0, href: "/admin/news" },
    { label: "日記", en: "DIARY", count: diary.count ?? 0, href: "/admin/diary" },
    { label: "リリース", en: "RELEASES", count: releases.count ?? 0, href: "/admin/releases" },
    { label: "楽曲", en: "SONGS", count: songs.count ?? 0, href: "/admin/songs" },
    { label: "ライブ", en: "LIVE", count: lives.count ?? 0, href: "/admin/live" },
  ];

  return (
    <div>
      <h1 className="font-mincho text-2xl font-extrabold text-washi">ダッシュボード</h1>
      <p className="mt-2 text-xs text-smoke">
        ようこそ、コントロールルームへ。各コンテンツはここから編集できます。
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group border border-line bg-kuro/40 p-5 transition-colors hover:border-shu/60"
          >
            <p className="font-mono text-[9px] tracking-[0.3em] text-shu">{s.en}</p>
            <p className="mt-3 font-display text-4xl text-washi group-hover:text-shu-bright">
              {s.count}
            </p>
            <p className="mt-1 text-[11px] text-smoke">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-line bg-kuro/30 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[11px] tracking-[0.3em] text-smoke">最近の受信メッセージ</h2>
          <Link href="/admin/messages" className="font-mono text-[10px] tracking-[0.2em] text-shu hover:text-shu-bright">
            すべて見る →
          </Link>
        </div>
        {messages.data && messages.data.length > 0 ? (
          <ul className="mt-4 divide-y divide-line">
            {messages.data.map((m) => (
              <li key={m.id} className="flex items-baseline gap-4 py-3">
                <span className="font-mono text-[10px] text-ash">{fmtDot(m.created_at)}</span>
                <span className="text-xs font-bold text-washi">{m.name}</span>
                <span className="truncate text-xs text-smoke">{m.subject ?? "(件名なし)"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-xs text-ash">まだメッセージはありません。</p>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/admin/diary/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + 日記を書く
        </Link>
        <Link
          href="/admin/news/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + お知らせを出す
        </Link>
        <Link
          href="/admin/live/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + ライブを追加
        </Link>
      </div>
    </div>
  );
}
