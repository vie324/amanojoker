import Link from "next/link";
import { AdminNotice } from "@/components/admin/fields";
import { createNews } from "../actions";
import NewsForm from "../Form";

export default async function NewNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <Link href="/admin/news" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">お知らせを作成</h1>
      <AdminNotice error={error} />
      <NewsForm action={createNews} />
    </div>
  );
}
