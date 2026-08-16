import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import type { Song } from "@/lib/types";
import { updateSong } from "../actions";
import SongForm from "../Form";

export default async function EditSongPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { id } = await params;
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb.from("songs").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as Song;

  return (
    <div>
      <Link href="/admin/songs" className="font-mono text-[10px] tracking-[0.25em] text-smoke hover:text-shu">
        ← 一覧に戻る
      </Link>
      <h1 className="mt-4 mb-8 font-mincho text-2xl font-extrabold text-washi">楽曲を編集</h1>
      <AdminNotice saved={saved} error={error} />
      <SongForm action={updateSong.bind(null, item.id)} item={item} />
    </div>
  );
}
