import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import TateText from "@/components/TateText";
import { Parallax, Reveal, SlideIn } from "@/components/motion";
import { BAND_PHOTOS, CONCEPT, HISTORY, MEMBERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "プロフィール",
  description: `天邪鬼 Amanojoker のプロフィール。${CONCEPT.body}`,
};

export default function ProfilePage() {
  return (
    <>
      <PageHero
        en="Profile"
        ja="プロフィール"
        kanji="鬼"
        description="温故知新型ロックンロールバンド、天邪鬼のすべて。"
      />

      {/* ============ CONCEPT — 紙のセクション ============ */}
      <section className="washi-block relative overflow-hidden">
        <Parallax
          distance={60}
          className="pointer-events-none absolute top-6 right-4 select-none md:right-16"
        >
          <TateText
            text="温故知新"
            className="font-mincho text-[9rem] font-extrabold text-sumi/[0.05] md:text-[13rem]"
            charClassName="leading-[1.02]"
          />
        </Parallax>
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.4em] text-blood">(CONCEPT)</p>
            <h2 className="mt-6 font-mincho text-3xl leading-snug font-extrabold text-sumi md:text-5xl md:leading-[1.4]">
              21世紀に失われた、
              <br />
              しぶといロックを
              <br />
              <span className="relative inline-block">
                全く新しい形で。
                <span aria-hidden="true" className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-shu/30 md:h-5" />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-sm leading-[2.2] text-sumi/80">
              {CONCEPT.body}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {CONCEPT.keywords.map((kw) => (
                <li
                  key={kw}
                  className="border border-sumi/25 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-sumi/70"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35}>
            <figure className="relative mt-14 max-w-3xl">
              <span aria-hidden="true" className="absolute -top-3 -right-3 h-full w-full border border-blood/30" />
              <Image
                src={BAND_PHOTOS.stand}
                alt="天邪鬼 集合写真 — 左からバーボン了(ベース)、アトランティス仁誠(ドラムス)、ウノ太一(ギター&ボーカル)"
                width={1600}
                height={899}
                className="relative border border-sumi/20 object-cover"
              />
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-sumi/50">
                <span>L to R — RYO BOURBON / JINSEI ATLANTIS / TAICHI UNO</span>
                <span className="text-blood/70">天邪鬼</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <Marquee
          className="border-t border-sumi/15 py-3"
          slow
          items={[
            <span key="a" className="mx-6 font-display text-xs tracking-[0.3em] text-sumi/50">
              →NEW OLD← ROCK&apos;N&apos;ROLL MUSIC
            </span>,
            <span key="b" className="mx-6 font-mincho text-xs font-bold text-blood/60">
              天邪鬼
            </span>,
          ]}
        />
      </section>

      {/* ============ MEMBERS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading index="01" en="Members" ja="メンバー" />
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {MEMBERS.map((m, i) => (
            <Reveal key={m.nameEn} delay={0.12 * i}>
              <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-kuro/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-shu/60">
                <div className="relative overflow-hidden">
                  <Image
                    src={m.photo}
                    alt={`${m.name}(${m.part})`}
                    width={600}
                    height={750}
                    className="aspect-[4/5] w-full object-cover saturate-[0.88] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-kuro/90 to-transparent"
                  />
                  <span className="absolute top-4 right-4 flex h-12 w-12 rotate-[-4deg] items-center justify-center rounded-full border-2 border-shu bg-sumi/60 font-mincho text-xl font-extrabold text-shu backdrop-blur-sm transition-transform duration-700 group-hover:rotate-[352deg]">
                    {m.kanji}
                  </span>
                  <p className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.35em] text-washi/90">
                    {m.partEn}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-mincho text-2xl font-extrabold text-washi">{m.name}</h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-ash">{m.nameEn}</p>
                  <p className="mt-4 text-xs leading-[1.9] text-smoke">{m.note}</p>
                  <p className="mt-auto pt-5 font-mono text-[10px] tracking-[0.2em] text-ash">
                    ── {m.part}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ HISTORY ============ */}
      <section className="border-t border-line bg-kuro/50">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading index="02" en="History" ja="沿革" />
          <div className="relative ml-2 border-l border-line-2 md:ml-24">
            {HISTORY.map((h, i) => (
              <SlideIn key={`${h.year}-${h.title}`} from="left" delay={0.05 * i}>
                <div className="group relative pb-12 pl-8 last:pb-0 md:pl-14">
                  <span className="absolute top-1.5 -left-[5px] h-[9px] w-[9px] rotate-45 border border-shu bg-sumi transition-colors duration-300 group-hover:bg-shu" />
                  <p className="flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-3xl tracking-wide text-washi md:text-4xl">
                      {h.year}
                    </span>
                    {h.month && (
                      <span className="font-mono text-[10px] tracking-[0.3em] text-shu">
                        {h.month}月
                      </span>
                    )}
                  </p>
                  <h3 className="mt-2 text-sm font-bold text-washi md:text-base">{h.title}</h3>
                  {h.body && (
                    <p className="mt-2 max-w-lg text-xs leading-relaxed text-smoke">{h.body}</p>
                  )}
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LINKS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 border border-line bg-kuro/30 px-6 py-12 text-center md:py-16">
            <p className="font-mono text-[10px] tracking-[0.4em] text-smoke">LISTEN &amp; FOLLOW</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <a
                href={SITE.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden border border-washi/40 px-7 py-3 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
              >
                <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
                <span className="relative transition-colors group-hover:text-sumi">
                  ♪ APPLE MUSIC で聴く →
                </span>
              </a>
              <a
                href={SITE.eggs}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep font-mono text-xs tracking-[0.25em] text-washi/80 hover:text-washi"
              >
                ◉ EGGS で試聴
              </a>
              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep font-mono text-xs tracking-[0.25em] text-washi/80 hover:text-washi"
              >
                X {SITE.xHandle}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
