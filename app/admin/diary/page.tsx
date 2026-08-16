import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import { fmtDot } from "@/lib/format";
import type { DiaryPost } from "@/lib/types";
import { deleteDiary } from "./actions";

export default async function AdminDiaryList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb
    .from("diary_posts")
    .select("*")
    .order("published_at", { ascending: false });
  const items = (data ?? []) as DiaryPost[];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mincho text-2xl font-extrabold text-washi">日記</h1>
        <Link
          href="/admin/diary/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + 日記を書く
        </Link>
      </div>
      <AdminNotice saved={saved} error={error} />
      {items.length === 0 ? (
        <p className="border border-dashed border-line-2 px-6 py-12 text-center text-xs text-smoke">
          まだ日記がありません。最初の1本を書きましょう。
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-2 font-mincho text-base font-bold text-shu">
                {item.cover_kanji ?? "記"}
              </span>
              <span className="w-24 shrink-0 font-mono text-[10px] text-ash">
                {fmtDot(item.published_at)}
              </span>
              <Link
                href={`/admin/diary/${item.id}`}
                className="min-w-0 flex-1 truncate text-sm text-washi hover:text-shu-bright"
              >
                {item.title}
              </Link>
              {!item.is_published && (
                <span className="shrink-0 border border-line-2 px-2 py-0.5 font-mono text-[9px] text-ash">
                  下書き
                </span>
              )}
              <a
                href={`/diary/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-mono text-[10px] tracking-[0.15em] text-smoke hover:text-washi"
              >
                表示↗
              </a>
              <Link
                href={`/admin/diary/${item.id}`}
                className="shrink-0 border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-washi hover:text-washi"
              >
                編集
              </Link>
              <DeleteButton action={deleteDiary.bind(null, item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
