"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, slugify } from "@/lib/admin";

function payloadFrom(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const trackNo = String(formData.get("track_no") ?? "").trim();
  const sortOrder = String(formData.get("sort_order") ?? "").trim();
  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    reading: String(formData.get("reading") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    catch_copy: String(formData.get("catch_copy") ?? "").trim() || null,
    release: String(formData.get("release") ?? "").trim() || null,
    track_no: trackNo ? Number(trackNo) : null,
    duration: String(formData.get("duration") ?? "").trim() || null,
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    eggs_url: String(formData.get("eggs_url") ?? "").trim() || null,
    youtube_url: String(formData.get("youtube_url") ?? "").trim() || null,
    accent_color: String(formData.get("accent_color") ?? "").trim() || "#e63a21",
    sort_order: sortOrder ? Number(sortOrder) : 0,
    is_published: formData.get("is_published") === "on",
  };
}

export async function createSong(formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  if (!payload.title) redirect("/admin/songs/new?error=%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%81%AF%E5%BF%85%E9%A0%88");
  const { error } = await sb.from("songs").insert(payload);
  if (error) redirect(`/admin/songs/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/admin/songs?saved=1");
}

export async function updateSong(id: string, formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  const { error } = await sb.from("songs").update(payload).eq("id", id);
  if (error) redirect(`/admin/songs/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/songs/${id}?saved=1`);
}

export async function deleteSong(id: string) {
  const { sb } = await requireUser();
  await sb.from("songs").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/songs?saved=1");
}
