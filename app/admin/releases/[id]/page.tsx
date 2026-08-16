import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { Release } from "@/lib/types";
import { updateRelease } from "../actions";
import ReleaseForm from "../Form";

export default async function EditReleasePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("releases").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Release;

  return (
    <div>
      <Link href="/admin/releases" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">作品を編集</h1>
      <AdminNotice saved={saved} error={error} />
      <ReleaseForm action={updateRelease.bind(null, item.id)} item={item} />
    </div>
  );
}
