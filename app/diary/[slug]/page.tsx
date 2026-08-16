import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal } from "@/components/motion";
import { getDiaryPost, getDiaryPosts } from "@/lib/data";
import { fmtDot } from "@/lib/format";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDiaryPost(slug);
  if (!post) return { title: "日記が見つかりません" };
  return {
    title: `${post.title} — 天邪鬼日記`,
    description: post.body.replace(/[#>*`\-]/g, "").replace(/\n+/g, " ").trim().slice(0, 90),
  };
}

export default async function DiaryPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getDiaryPost(slug), getDiaryPosts()]);
  if (!post) notFound();

  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <article className="relative overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 font-mincho text-[18rem] leading-none font-extrabold text-washi/[0.03] select-none md:text-[30rem]"
      >
        {post.cover_kanji ?? "記"}
      </span>

      <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-20 md:px-8 md:pt-40 md:pb-28">
        <Reveal>
          <Link
            href="/diary"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-smoke transition-colors hover:text-shu"
          >
            ← BACK TO DIARY
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <header className="mt-10 border-b border-line pb-10">
            <div className="flex flex-wrap items-center gap-4">
              <time className="font-mono text-xs tracking-[0.25em] text-shu">
                {fmtDot(post.published_at)}
              </time>
              {post.mood && (
                <span className="border border-line-2 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-smoke">
                  気分: {post.mood}
                </span>
              )}
            </div>
            <h1 className="mt-6 font-mincho text-3xl leading-[1.4] font-extrabold text-washi md:text-5xl md:leading-[1.35]">
              {post.title}
            </h1>
            <p className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-ash">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-shu/60 font-mincho text-sm font-bold text-shu">
                {(post.author ?? "天")[0]}
              </span>
              {post.author ?? "天邪鬼"}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="prose-joker mt-10 text-washi/85">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>
        </Reveal>

        <div className="mt-16 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-line" />
          <span className="font-mincho text-lg font-bold text-shu">天</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <nav className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2" aria-label="前後の日記">
          {older ? (
            <Link href={`/diary/${older.slug}`} className="group bg-sumi p-6 transition-colors hover:bg-kuro">
              <p className="font-mono text-[10px] tracking-[0.3em] text-ash">← OLDER</p>
              <p className="mt-2 font-mincho text-base font-bold text-washi group-hover:text-shu-bright">
                {older.title}
              </p>
            </Link>
          ) : (
            <span className="hidden bg-sumi p-6 md:block" />
          )}
          {newer ? (
            <Link
              href={`/diary/${newer.slug}`}
              className="group bg-sumi p-6 text-right transition-colors hover:bg-kuro"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-ash">NEWER →</p>
              <p className="mt-2 font-mincho text-base font-bold text-washi group-hover:text-shu-bright">
                {newer.title}
              </p>
            </Link>
          ) : (
            <span className="hidden bg-sumi p-6 md:block" />
          )}
        </nav>
      </div>
    </article>
  );
}
