import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { LiveEvent } from "@/lib/types";
import { updateLive } from "../actions";
import LiveForm from "../Form";

export default async function EditLivePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("live_events").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as LiveEvent;

  return (
    <div>
      <Link href="/admin/live" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">ライブを編集</h1>
      <AdminNotice saved={saved} error={error} />
      <LiveForm action={updateLive.bind(null, item.id)} item={item} />
    </div>
  );
}
