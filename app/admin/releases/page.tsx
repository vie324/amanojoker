/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { Release } from "@/lib/types";
import { deleteRelease } from "./actions";

export default async function AdminReleasesList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("releases").select("*").order("sort_order", { ascending: true });
  const items = (data ?? []) as Release[];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mincho text-2xl font-extrabold text-washi">リリース</h1>
        <Link
          href="/admin/releases/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + 作品を追加
        </Link>
      </div>
      <AdminNotice saved={saved} error={error} />
      {items.length === 0 ? (
        <p className="border border-dashed border-line-2 px-6 py-12 text-center text-xs text-smoke">
          まだ作品がありません。
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              {item.cover_url ? (
                <img
                  src={item.cover_url}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 border border-line-2 object-cover"
                />
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line-2 font-mincho text-sm text-ash">
                  盤
                </span>
              )}
              <span className="w-14 shrink-0 font-mono text-[9px] tracking-[0.15em] text-shu">
                {item.type.toUpperCase()}
              </span>
              <Link
                href={`/admin/releases/${item.id}`}
                className="min-w-0 flex-1 truncate font-mincho text-sm font-bold text-washi hover:text-shu-bright"
              >
                {item.title}
              </Link>
              <span className="hidden shrink-0 font-mono text-[10px] text-ash md:block">
                {item.release_date ?? ""}
              </span>
              <span className="hidden shrink-0 font-mono text-[10px] text-ash md:block">
                {item.tracks.length}曲
              </span>
              {!item.is_published && (
                <span className="shrink-0 border border-line-2 px-2 py-0.5 font-mono text-[9px] text-ash">
                  下書き
                </span>
              )}
              <Link
                href={`/admin/releases/${item.id}`}
                className="shrink-0 border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-washi hover:text-washi"
              >
                編集
              </Link>
              <DeleteButton action={deleteRelease.bind(null, item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
