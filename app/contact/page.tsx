import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import XIcon from "@/components/XIcon";
import { Reveal } from "@/components/motion";
import { isSupabaseConfigured } from "@/lib/supabase/public";
import { SITE } from "@/lib/site";
import { submitContact } from "./actions";

export const metadata: Metadata = {
  title: "コンタクト",
  description:
    "天邪鬼 Amanojoker へのチケット予約・出演オファー・お問い合わせはこちらから。",
};

const inputClass =
  "w-full border border-line-2 bg-kuro/60 px-4 py-3 text-sm text-washi placeholder:text-ash focus:border-shu focus:outline-none transition-colors";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;
  const configured = isSupabaseConfigured();

  const errorMessage =
    error === "missing"
      ? "お名前・メールアドレス・本文は必須です。"
      : error === "email"
        ? "メールアドレスの形式が正しくないようです。"
        : error === "toolong"
          ? "本文が長すぎます。4000字以内でお願いします。"
          : error === "unconfigured"
            ? "フォームは現在準備中です。下のリンクからご連絡ください。"
            : error
              ? "送信に失敗しました。時間をおいて再度お試しください。"
              : null;

  return (
    <>
      <PageHero
        en="Contact"
        ja="コンタクト"
        kanji="文"
        description="チケット予約・出演オファー・取材依頼など、お気軽にどうぞ。"
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-[1fr_1.2fr] md:gap-20 md:px-8 md:py-24">
        {/* left: channels */}
        <div>
          <Reveal>
            <h2 className="font-mincho text-2xl leading-relaxed font-extrabold text-washi md:text-3xl">
              御用の方は、
              <br />
              こちらまで。
            </h2>
            <p className="mt-6 text-xs leading-loose text-smoke">
              ライブのチケット予約、対バン・出演のオファー、
              取材・音源のご相談など、なんでもどうぞ。
              返信は本音でお返しします。
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-4">
              <li>
                <a
                  href={SITE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-line bg-kuro/40 p-5 transition-colors hover:border-shu/60"
                >
                  <XIcon className="h-5 w-5 text-washi transition-colors group-hover:text-shu" />
                  <span>
                    <span className="block font-mono text-xs tracking-[0.2em] text-washi">
                      X (DM解放中)
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.15em] text-smoke">
                      {SITE.xHandle}
                    </span>
                  </span>
                  <span className="ml-auto font-mono text-shu opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.contactForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-line bg-kuro/40 p-5 transition-colors hover:border-shu/60"
                >
                  <span className="text-lg" aria-hidden="true">
                    ✉
                  </span>
                  <span>
                    <span className="block font-mono text-xs tracking-[0.2em] text-washi">
                      従来のフォーム
                    </span>
                    <span className="mt-1 block font-mono text-[10px] tracking-[0.15em] text-smoke">
                      tayori.com (旧サイトより継続)
                    </span>
                  </span>
                  <span className="ml-auto font-mono text-shu opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* right: form */}
        <Reveal delay={0.1}>
          <div className="relative border border-line bg-kuro/30 p-6 md:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-7 -right-3 font-mincho text-[8rem] leading-none font-extrabold text-washi/[0.04] select-none"
            >
              文
            </span>

            {sent ? (
              <div className="py-14 text-center">
                <p className="font-mincho text-3xl font-extrabold text-shu">拝受。</p>
                <p className="mt-5 text-sm leading-loose text-washi/85">
                  メッセージを受け取りました。
                  <br />
                  素直に返信するかどうかは、天邪鬼次第。
                  <br />
                  (真面目な用件にはちゃんと返します)
                </p>
              </div>
            ) : (
              <form action={submitContact} className="space-y-6">
                <p className="font-mono text-[10px] tracking-[0.35em] text-shu">(MESSAGE FORM)</p>

                {errorMessage && (
                  <p role="alert" className="border border-shu/60 bg-blood/20 px-4 py-3 text-xs text-shu-bright">
                    {errorMessage}
                  </p>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke">
                      NAME / お名前 *
                    </span>
                    <input name="name" required maxLength={100} className={inputClass} placeholder="山田 太郎" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke">
                      EMAIL / メール *
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={200}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke">
                    SUBJECT / 件名
                  </span>
                  <input
                    name="subject"
                    maxLength={200}
                    className={inputClass}
                    placeholder="チケット予約 / 出演オファー など"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] tracking-[0.25em] text-smoke">
                    MESSAGE / 本文 *
                  </span>
                  <textarea
                    name="body"
                    required
                    rows={7}
                    maxLength={4000}
                    className={inputClass}
                    placeholder="ご用件をどうぞ。"
                  />
                </label>

                {/* honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!configured}
                  className="group relative w-full overflow-hidden border border-washi/40 px-8 py-4 font-mono text-xs tracking-[0.3em] text-washi transition-colors hover:border-shu disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0 group-disabled:hidden" />
                  <span className="relative transition-colors group-hover:text-sumi">
                    {configured ? "送信する →" : "フォーム準備中 (左のリンクをご利用ください)"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
