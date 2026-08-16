import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { Song } from "@/lib/types";
import { deleteSong } from "./actions";

export default async function AdminSongsList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("songs").select("*").order("sort_order", { ascending: true });
  const items = (data ?? []) as Song[];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mincho text-2xl font-extrabold text-washi">楽曲</h1>
        <Link
          href="/admin/songs/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + 楽曲を追加
        </Link>
      </div>
      <AdminNotice saved={saved} error={error} />
      {items.length === 0 ? (
        <p className="border border-dashed border-line-2 px-6 py-12 text-center text-xs text-smoke">
          まだ楽曲がありません。
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item, i) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <span className="w-8 shrink-0 font-display text-lg text-ash">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="h-8 w-1.5 shrink-0"
                style={{ backgroundColor: item.accent_color ?? "#e63a21" }}
                aria-hidden="true"
              />
              <Link
                href={`/admin/songs/${item.id}`}
                className="min-w-0 flex-1 truncate font-mincho text-sm font-bold text-washi hover:text-shu-bright"
              >
                {item.title}
              </Link>
              <span className="hidden shrink-0 font-mono text-[10px] text-ash md:block">
                {item.release ?? ""}
              </span>
              {!item.is_published && (
                <span className="shrink-0 border border-line-2 px-2 py-0.5 font-mono text-[9px] text-ash">
                  下書き
                </span>
              )}
              <a
                href={`/music/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-smoke hover:text-washi"
              >
                表示↗
              </a>
              <Link
                href={`/admin/songs/${item.id}`}
                className="shrink-0 border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-washi hover:text-washi"
              >
                編集
              </Link>
              <DeleteButton action={deleteSong.bind(null, item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
