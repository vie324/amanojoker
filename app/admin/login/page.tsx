import type { Metadata } from "next";
import SealLogo from "@/components/SealLogo";
import { Field, Input, SubmitButton } from "@/components/admin/fields";
import { signIn } from "../actions";

export const metadata: Metadata = { title: "ログイン" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message =
    error === "auth"
      ? "メールアドレスまたはパスワードが違います。"
      : error === "missing"
        ? "メールアドレスとパスワードを入力してください。"
        : error === "unconfigured"
          ? "Supabase が未設定です。README を参照してください。"
          : null;

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-5">
      <span
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute font-mincho text-[70vh] leading-none font-extrabold opacity-20 select-none"
      >
        鬼
      </span>
      <div className="relative w-full max-w-sm border border-line bg-sumi/90 p-8 backdrop-blur md:p-10">
        <div className="flex items-center gap-4">
          <SealLogo className="h-12 w-12 text-shu" />
          <div>
            <p className="font-display text-xl tracking-[0.2em] text-washi">ADMIN</p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.3em] text-smoke">
              AMANOJOKER CONTROL ROOM
            </p>
          </div>
        </div>

        {message && (
          <p role="alert" className="mt-6 border border-shu/60 bg-blood/20 px-4 py-3 text-xs text-shu-bright">
            {message}
          </p>
        )}

        <form action={signIn} className="mt-8 space-y-5">
          <Field label="EMAIL">
            <Input name="email" type="email" required autoComplete="email" placeholder="you@band.com" />
          </Field>
          <Field label="PASSWORD">
            <Input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" />
          </Field>
          <SubmitButton>入室する →</SubmitButton>
        </form>

        <p className="mt-8 text-[10px] leading-relaxed text-ash">
          アカウントは Supabase ダッシュボードの Authentication → Users から作成できます。
        </p>
      </div>
    </div>
  );
}
