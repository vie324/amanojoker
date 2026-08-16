import Link from "next/link";
import { AdminNotice } from "@/components/admin/fields";
import { createLive } from "../actions";
import LiveForm from "../Form";

export default async function NewLivePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div>
      <Link href="/admin/live" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">ライブを追加</h1>
      <AdminNotice error={error} />
      <LiveForm action={createLive} />
    </div>
  );
}
