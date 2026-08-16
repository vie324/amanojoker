import Link from "next/link";
import { AdminNotice } from "@/components/admin/fields";
import { createDiary } from "../actions";
import DiaryForm from "../Form";

export default async function NewDiaryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <Link href="/admin/diary" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">日記を書く</h1>
      <AdminNotice error={error} />
      <DiaryForm action={createDiary} />
    </div>
  );
}
