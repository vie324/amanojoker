"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseDateTime, requireUser, slugify } from "@/lib/admin";

function payloadFrom(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    body: String(formData.get("body") ?? "").trim(),
    author: String(formData.get("author") ?? "").trim() || null,
    mood: String(formData.get("mood") ?? "").trim() || null,
    cover_kanji: String(formData.get("cover_kanji") ?? "").trim().slice(0, 1) || null,
    published_at: parseDateTime(formData.get("published_at")),
    is_published: formData.get("is_published") === "on",
  };
}

export async function createDiary(formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  if (!payload.title || !payload.body) {
    redirect("/admin/diary/new?error=%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%81%A8%E6%9C%AC%E6%96%87%E3%81%AF%E5%BF%85%E9%A0%88");
  }
  const { error } = await sb.from("diary_posts").insert(payload);
  if (error) redirect(`/admin/diary/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/admin/diary?saved=1");
}

export async function updateDiary(id: string, formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  const { error } = await sb.from("diary_posts").update(payload).eq("id", id);
  if (error) redirect(`/admin/diary/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/diary/${id}?saved=1`);
}

export async function deleteDiary(id: string) {
  const { sb } = await requireUser();
  await sb.from("diary_posts").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/diary?saved=1");
}
