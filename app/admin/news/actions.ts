"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseDateTime, requireUser } from "@/lib/admin";

function payloadFrom(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim() || null,
    category: String(formData.get("category") ?? "info"),
    published_at: parseDateTime(formData.get("published_at")),
    is_published: formData.get("is_published") === "on",
  };
}

export async function createNews(formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  if (!payload.title) redirect("/admin/news/new?error=%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%81%AF%E5%BF%85%E9%A0%88");
  const { error } = await sb.from("news").insert(payload);
  if (error) redirect(`/admin/news/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/admin/news?saved=1");
}

export async function updateNews(id: string, formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  const { error } = await sb.from("news").update(payload).eq("id", id);
  if (error) redirect(`/admin/news/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/news/${id}?saved=1`);
}

export async function deleteNews(id: string) {
  const { sb } = await requireUser();
  await sb.from("news").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/news?saved=1");
}
