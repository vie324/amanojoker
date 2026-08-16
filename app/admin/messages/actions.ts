"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/admin";

export async function deleteMessage(id: string) {
  const { sb } = await requireUser();
  await sb.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
  redirect("/admin/messages?saved=1");
}
