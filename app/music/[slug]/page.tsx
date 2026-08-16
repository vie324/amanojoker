import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Reveal, StaggerChars } from "@/components/motion";
import TateText from "@/components/TateText";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getSong, getSongs } from "@/lib/data";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const song = await getSong(slug);
  if (!song) return { title: "楽曲が見つかりません" };
  return {
    title: `${song.title} — 楽曲紹介`,
    description: song.catch_copy ?? `天邪鬼 Amanojoker「${song.title}」の紹介。`,
  };
}

export default async function SongPage({ params }: Props) {
  const { slug } = await params;
  const [song, all] = await Promise.all([getSong(slug), getSongs()]);
  if (!song) notFound();

  const idx = all.findIndex((s) => s.slug === song.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const accent = song.accent_color ?? "#e63a21";

  return (
    <article className="relative overflow-hidden">
      {/* accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full opacity-25"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
      />

      <div className="relative mx-auto max-w-5xl px-5 pt-28 pb-20 md:px-8 md:pt-40 md:pb-28">
        <Reveal>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-smoke transition-colors hover:text-shu"
          >
            ← BACK TO MUSIC
          </Link>
        </Reveal>

        <header className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-smoke">
              {song.release && <span>◉ {song.release}</span>}
              {song.track_no != null && <span>TRACK {String(song.track_no).padStart(2, "0")}</span>}
            </p>
            <h1 className="mt-5">
              <StaggerChars
                text={song.title}
                step={0.06}
                className="font-mincho text-5xl leading-[1.15] font-extrabold text-washi md:text-7xl"
              />
            </h1>
            {song.reading && (
              <p className="mt-4 font-mono text-[11px] tracking-[0.4em] text-ash">
                {song.reading}
              </p>
            )}
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {song.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-line-2 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-smoke"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          {song.catch_copy && (
            <Reveal delay={0.3} className="hidden md:block">
              <TateText
                text={song.catch_copy}
                className="font-mincho text-xl font-bold"
                charClassName="leading-[1.55]"
                style={{ color: accent }}
              />
            </Reveal>
          )}
        </header>

        {song.catch_copy && (
          <p className="mt-8 font-mincho text-lg font-bold md:hidden" style={{ color: accent }}>
            {song.catch_copy}
          </p>
        )}

        <Reveal delay={0.2}>
          <div className="mt-14 border-t border-line pt-10">
            <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-shu">(LINER NOTES)</p>
            {song.description ? (
              <div className="prose-joker max-w-2xl text-washi/85">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{song.description}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-smoke">紹介文は近日公開。</p>
            )}
          </div>
        </Reveal>

        {song.youtube_url && (
          <Reveal delay={0.2}>
            <div className="mt-14 border-t border-line pt-10">
              <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-shu">
                (MUSIC VIDEO)
              </p>
              <YouTubeEmbed
                url={song.youtube_url}
                title={`天邪鬼「${song.title}」MV`}
                className="max-w-3xl"
              />
            </div>
          </Reveal>
        )}

        {(song.apple_url || song.eggs_url || song.youtube_url) && (
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4">
              {song.apple_url && (
                <a
                  href={song.apple_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden border border-washi/40 px-7 py-3 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
                >
                  <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
                  <span className="relative transition-colors group-hover:text-sumi">
                    ♪ APPLE MUSIC で聴く
                  </span>
                </a>
              )}
              {song.eggs_url && (
                <a
                  href={song.eggs_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep font-mono text-xs tracking-[0.25em] text-washi/80 hover:text-washi"
                >
                  ◉ EGGS
                </a>
              )}
              {song.youtube_url && (
                <a
                  href={song.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep font-mono text-xs tracking-[0.25em] text-washi/80 hover:text-washi"
                >
                  ▶ YOUTUBE で開く
                </a>
              )}
            </div>
          </Reveal>
        )}

        {/* prev / next */}
        <nav className="mt-20 grid gap-px border border-line bg-line md:grid-cols-2" aria-label="前後の楽曲">
          {prev ? (
            <Link
              href={`/music/${prev.slug}`}
              className="group bg-sumi p-6 transition-colors hover:bg-kuro"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-ash">← PREV</p>
              <p className="mt-2 font-mincho text-lg font-bold text-washi group-hover:text-shu-bright">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span className="hidden bg-sumi p-6 md:block" />
          )}
          {next ? (
            <Link
              href={`/music/${next.slug}`}
              className="group bg-sumi p-6 text-right transition-colors hover:bg-kuro"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-ash">NEXT →</p>
              <p className="mt-2 font-mincho text-lg font-bold text-washi group-hover:text-shu-bright">
                {next.title}
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
