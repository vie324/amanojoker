"use server";

import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/admin/login?error=missing");

  const sb = await getServerClient();
  if (!sb) redirect("/admin/login?error=unconfigured");

  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=auth");
  redirect("/admin");
}

export async function signOut() {
  const sb = await getServerClient();
  if (sb) await sb.auth.signOut();
  redirect("/admin/login");
}
