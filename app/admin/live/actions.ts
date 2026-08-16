"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin";

function payloadFrom(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    open_time: String(formData.get("open_time") ?? "").trim() || null,
    start_time: String(formData.get("start_time") ?? "").trim() || null,
    venue: String(formData.get("venue") ?? "").trim(),
    area: String(formData.get("area") ?? "").trim() || null,
    ticket_price: String(formData.get("ticket_price") ?? "").trim() || null,
    note: String(formData.get("note") ?? "").trim() || null,
    link_url: String(formData.get("link_url") ?? "").trim() || null,
    is_published: formData.get("is_published") === "on",
  };
}

export async function createLive(formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  if (!payload.title || !payload.date || !payload.venue) {
    redirect("/admin/live/new?error=%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%83%BB%E6%97%A5%E4%BB%98%E3%83%BB%E4%BC%9A%E5%A0%B4%E3%81%AF%E5%BF%85%E9%A0%88");
  }
  const { error } = await sb.from("live_events").insert(payload);
  if (error) redirect(`/admin/live/new?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect("/admin/live?saved=1");
}

export async function updateLive(id: string, formData: FormData) {
  const { sb } = await requireUser();
  const payload = payloadFrom(formData);
  const { error } = await sb.from("live_events").update(payload).eq("id", id);
  if (error) redirect(`/admin/live/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/", "layout");
  redirect(`/admin/live/${id}?saved=1`);
}

export async function deleteLive(id: string) {
  const { sb } = await requireUser();
  await sb.from("live_events").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/live?saved=1");
}
