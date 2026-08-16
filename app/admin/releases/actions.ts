"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, slugify } from "@/lib/admin";

function payloadFrom(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const sortOrder = String(formData.get("sort_order") ?? "").trim();
  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    type: String(formData.get("type") ?? "single"),
    release_date: String(formData.get("release_date") ?? "").trim() || null,
    cover_url: String(formData.get("cover_url") ?? "").trim() || null,
    apple_url: String(formData.get("apple_url") ?? "").trim() || null,
    eggs_url: String(formData.get("eggs_url") ?? "").trim() || null,
    youtube_url: String(formData.get("youtube_url") ?? "").trim() || null,
    description: String(formData.get("description") ?? "").trim() || null,
    tracks: String(formData.get("tracks") ?? "")
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
    sort_order: sortOrder ? Number(sortOrder) : 0,
    is_published: formData.get("is_published") === "on",
  };
}

export async function createRelease(formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  if (!payload.title) redirect("/admin/releases/new?error=%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%81%AF%E5%BF%85%E9%A0%88");
  const { error } = await sb.from("releases").insert(payload);
  if (error) redirect(`/admin/releases/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/admin/releases?saved=1");
}

export async function updateRelease(id: string, formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  const { error } = await sb.from("releases").update(payload).eq("id", id);
  if (error) redirect(`/admin/releases/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/releases/${id}?saved=1`);
}

export async function deleteRelease(id: string) {
  const { sb } = await requireUser();
  await sb.from("releases").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/releases?saved=1");
}
