import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { LiveRow } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getLives } from "@/lib/data";
import { isUpcoming } from "@/lib/format";
import { SITE } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ライブ情報",
  description:
    "天邪鬼 Amanojoker のライブスケジュール。都内・神奈川のライブハウスを中心に活動中。チケット予約はコンタクトから。",
};

export default async function LivePage() {
  const lives = await getLives();
  const upcoming = lives.filter((l) => isUpcoming(l.date)).sort((a, b) => a.date.localeCompare(b.date));
  const past = lives.filter((l) => !isUpcoming(l.date));

  const pastByYear = past.reduce<Record<string, typeof past>>((acc, ev) => {
    const y = ev.date.slice(0, 4);
    (acc[y] ??= []).push(ev);
    return acc;
  }, {});
  const years = Object.keys(pastByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <PageHero
        en="Live"
        ja="ライブ情報"
        kanji="轟"
        description="ロックはフロアで浴びるもの。都内・神奈川のライブハウスを中心に興行中。"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {/* upcoming */}
        <Reveal>
          <div className="mb-4 flex items-center gap-4">
            <h2 className="font-display text-3xl tracking-wide text-washi md:text-4xl">
              UPCOMING
            </h2>
            <span className="font-mincho text-sm font-bold text-smoke">今後の予定</span>
            <span className="hazard h-2 flex-1 opacity-40" aria-hidden="true" />
          </div>
        </Reveal>

        {upcoming.length > 0 ? (
          <Reveal delay={0.1}>
            <div className="border-t border-line">
              {upcoming.map((ev) => (
                <LiveRow key={ev.id} ev={ev} />
              ))}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border border-dashed border-line-2 px-6 py-16 text-center">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -right-2 font-mincho text-[10rem] leading-none font-extrabold text-washi/[0.04] select-none"
              >
                鬼
              </span>
              <p className="font-display text-2xl tracking-[0.15em] text-washi md:text-4xl">
                NEXT SHOW — COMING SOON
              </p>
              <p className="mx-auto mt-5 max-w-md text-xs leading-loose text-smoke">
                次回公演は近日発表。解禁情報はXをチェック。
                出演オファー・チケットのご相談は
                <Link href="/contact" className="mx-1 text-shu underline underline-offset-4">
                  コンタクト
                </Link>
                まで。
              </p>
              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-8 inline-block overflow-hidden border border-washi/40 px-7 py-3 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
              >
                <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
                <span className="relative transition-colors group-hover:text-sumi">
                  X {SITE.xHandle} →
                </span>
              </a>
            </div>
          </Reveal>
        )}

        {/* archive */}
        <div className="mt-24">
          <Reveal>
            <div className="mb-4 flex items-center gap-4">
              <h2 className="font-display text-3xl tracking-wide text-washi md:text-4xl">
                ARCHIVE
              </h2>
              <span className="font-mincho text-sm font-bold text-smoke">これまでの興行</span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </div>
          </Reveal>

          {years.map((year) => (
            <div key={year} className="mt-10">
              <Reveal>
                <p className="mb-2 flex items-baseline gap-3">
                  <span className="font-display text-2xl text-shu">{year}</span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-ash">
                    {pastByYear[year].length} SHOWS
                  </span>
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="border-t border-line">
                  {pastByYear[year].map((ev) => (
                    <LiveRow key={ev.id} ev={ev} />
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
