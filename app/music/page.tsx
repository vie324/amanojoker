import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SongRow } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getSongs } from "@/lib/data";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "楽曲紹介",
  description:
    "天邪鬼 Amanojoker の楽曲紹介。CD「Late Show」収録曲ほか、しぶといロックンロールの数々。",
};

export default async function MusicPage() {
  const songs = await getSongs();

  const releases = Array.from(
    new Set(songs.map((s) => s.release).filter((r): r is string => Boolean(r))),
  );

  return (
    <>
      <PageHero
        en="Music"
        ja="楽曲紹介"
        kanji="唄"
        description="60-70年代ロックにタンゴ、ジャズ、フォークを飲み込んだ雑食の楽曲群。各曲の背景はタイトルをクリック。"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {releases.length > 0 && (
          <Reveal>
            <div className="mb-12 flex flex-wrap gap-3">
              {releases.map((r) => (
                <span
                  key={r}
                  className="border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke"
                >
                  ◉ {r}
                </span>
              ))}
            </div>
          </Reveal>
        )}
        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {songs.map((song, i) => (
              <SongRow key={song.id} song={song} index={i} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-col items-center gap-4 border border-dashed border-line-2 px-6 py-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.35em] text-smoke">
              FULL STREAMING ON EGGS
            </p>
            <a
              href={SITE.eggs}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border border-washi/40 px-8 py-3.5 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
            >
              <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors group-hover:text-sumi">
                EGGS で試聴する →
              </span>
            </a>
            <p className="text-[11px] text-ash">
              6曲入りCD「Late Show」はライブ会場にて発売中
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
