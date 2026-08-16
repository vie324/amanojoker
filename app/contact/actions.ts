"use server";

import { redirect } from "next/navigation";
import { getPublicClient } from "@/lib/supabase/public";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  // ハニーポット(bot はここを埋める)
  const trap = String(formData.get("website") ?? "");

  if (trap) redirect("/contact?sent=1");
  if (!name || !email || !body) redirect("/contact?error=missing");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect("/contact?error=email");
  if (body.length > 4000 || name.length > 100 || subject.length > 200) {
    redirect("/contact?error=toolong");
  }

  const sb = getPublicClient();
  if (!sb) redirect("/contact?error=unconfigured");

  const { error } = await sb.from("contact_messages").insert({
    name,
    email,
    subject: subject || null,
    body,
  });

  if (error) redirect("/contact?error=failed");
  redirect("/contact?sent=1");
}
