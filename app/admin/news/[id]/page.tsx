import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { News } from "@/lib/types";
import { updateNews } from "../actions";
import NewsForm from "../Form";

export default async function EditNewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("news").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as News;

  return (
    <div>
      <Link href="/admin/news" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">お知らせを編集</h1>
      <AdminNotice saved={saved} error={error} />
      <NewsForm action={updateNews.bind(null, item.id)} item={item} />
    </div>
  );
}
