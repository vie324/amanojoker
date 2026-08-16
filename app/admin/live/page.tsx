import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import { isUpcoming } from "@/lib/format";
import type { LiveEvent } from "@/lib/types";
import { deleteLive } from "./actions";

export default async function AdminLiveList({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("live_events").select("*").order("date", { ascending: false });
  const items = (data ?? []) as LiveEvent[];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-mincho text-2xl font-extrabold text-washi">ライブ</h1>
        <Link
          href="/admin/live/new"
          className="border border-line-2 px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-washi transition-colors hover:border-shu hover:text-shu"
        >
          + ライブを追加
        </Link>
      </div>
      <AdminNotice saved={saved} error={error} />
      {items.length === 0 ? (
        <p className="border border-dashed border-line-2 px-6 py-12 text-center text-xs text-smoke">
          まだライブ情報がありません。
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              <span className="w-24 shrink-0 font-mono text-[11px] text-washi">{item.date}</span>
              {isUpcoming(item.date) && (
                <span className="shrink-0 bg-shu px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-sumi">
                  予定
                </span>
              )}
              <Link
                href={`/admin/live/${item.id}`}
                className="min-w-0 flex-1 truncate text-sm text-washi hover:text-shu-bright"
              >
                {item.title}
              </Link>
              <span className="hidden shrink-0 text-xs text-smoke md:block">{item.venue}</span>
              {!item.is_published && (
                <span className="shrink-0 border border-line-2 px-2 py-0.5 font-mono text-[9px] text-ash">
                  下書き
                </span>
              )}
              <Link
                href={`/admin/live/${item.id}`}
                className="shrink-0 border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-washi hover:text-washi"
              >
                編集
              </Link>
              <DeleteButton action={deleteLive.bind(null, item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
