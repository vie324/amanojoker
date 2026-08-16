import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ReleaseCard from "@/components/ReleaseCard";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { SongRow } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getReleases, getSongs } from "@/lib/data";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "楽曲紹介",
  description:
    "天邪鬼 Amanojoker の楽曲紹介。「捨てたはずの街」「Hokey Pokers」「Late Show」がサブスク配信中。ミュージックビデオ・曲解説も。",
};

export default async function MusicPage() {
  const [releases, songs] = await Promise.all([getReleases(), getSongs()]);
  const movies = songs.filter((s) => s.youtube_url);

  return (
    <>
      <PageHero
        en="Music"
        ja="楽曲紹介"
        kanji="唄"
        description="サブスク配信中の3作品、ミュージックビデオ、そして一曲ずつの解説。60-70年代ロックにタンゴ、ジャズ、フォークを飲み込んだ雑食の楽曲群。"
      />

      {/* ============ RELEASES ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading index="01" en="Releases" ja="配信作品" />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {releases.map((r, i) => (
            <Reveal key={r.id} delay={0.1 * i}>
              <ReleaseCard release={r} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.25}>
          <p className="mt-8 flex flex-wrap items-center justify-end gap-x-6 gap-y-2">
            <a
              href={SITE.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-mono text-xs tracking-[0.2em] text-washi/80 hover:text-washi"
            >
              ♪ APPLE MUSIC アーティストページ ↗
            </a>
            <a
              href={SITE.eggs}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-mono text-xs tracking-[0.2em] text-washi/80 hover:text-washi"
            >
              ◉ EGGS で試聴 ↗
            </a>
          </p>
        </Reveal>
      </section>

      {/* ============ MOVIE ============ */}
      {movies.length > 0 && (
        <section className="border-y border-line bg-kuro/50">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading index="02" en="Movie" ja="ミュージックビデオ" />
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {movies.map((song, i) => (
                <Reveal key={song.id} delay={0.12 * i}>
                  <figure>
                    <YouTubeEmbed url={song.youtube_url!} title={`天邪鬼「${song.title}」MV`} />
                    <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-shu">MV</span>
                        <span className="font-mincho text-lg font-bold text-washi">
                          {song.title}
                        </span>
                      </span>
                      <Link
                        href={`/music/${song.slug}`}
                        className="link-sweep font-mono text-[10px] tracking-[0.2em] text-smoke hover:text-washi"
                      >
                        曲解説を読む →
                      </Link>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ LINER NOTES ============ */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading index="03" en="Liner Notes" ja="曲解説" />
        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {songs.map((song, i) => (
              <SongRow key={song.id} song={song} index={i} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 text-right text-[11px] text-ash">
            6曲入りCD「Late Show」はライブ会場でも手売り中。手売りこそロックの基本。
          </p>
        </Reveal>
      </section>
    </>
  );
}
