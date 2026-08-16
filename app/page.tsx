import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import TateText from "@/components/TateText";
import XIcon from "@/components/XIcon";
import { DiaryCard, LiveRow, NewsRow, SongRow } from "@/components/cards";
import { Parallax, Reveal, SlideIn } from "@/components/motion";
import { getDiaryPosts, getLives, getNews, getReleases, getSongs } from "@/lib/data";
import { fmtDot, isUpcoming } from "@/lib/format";
import { BAND_PHOTOS, CONCEPT, SITE } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const [news, songs, lives, diary, releases] = await Promise.all([
    getNews(4),
    getSongs(),
    getLives(),
    getDiaryPosts(3),
    getReleases(),
  ]);

  const upcoming = lives.filter((l) => isUpcoming(l.date)).slice(-2).reverse();
  const past = lives.filter((l) => !isUpcoming(l.date)).slice(0, 3);
  const latestRelease =
    [...releases].sort((a, b) => (b.release_date ?? "").localeCompare(a.release_date ?? ""))[0] ??
    null;

  return (
    <>
      <Hero />

      {/* marquee divider */}
      <Marquee
        className="border-y border-line bg-shu py-3.5"
        items={[
          <span key="a" className="mx-8 font-display text-sm tracking-[0.25em] text-sumi">
            →NEW OLD← ROCK&apos;N&apos;ROLL MUSIC
          </span>,
          <span key="b" className="mx-8 font-mincho text-sm font-extrabold text-sumi">
            天邪鬼
          </span>,
          <span key="c" className="mx-8 font-display text-sm tracking-[0.25em] text-sumi">
            AMANOJOKER
          </span>,
          <span key="d" className="mx-8 text-sm text-sumi">
            ★
          </span>,
        ]}
      />

      {/* ============ NEWS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading index="01" en="News" ja="お知らせ" />
        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {news.map((item) => (
              <NewsRow key={item.id} item={item} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="relative overflow-hidden border-y border-line bg-kuro/50">
        <Parallax
          distance={80}
          className="pointer-events-none absolute -top-10 right-0 select-none md:right-10"
        >
          <span aria-hidden="true" className="text-stroke font-display text-[10rem] leading-none opacity-40 md:text-[16rem]">
            OLD
          </span>
        </Parallax>
        <Parallax
          distance={-80}
          className="pointer-events-none absolute bottom-0 left-0 select-none md:left-10"
        >
          <span aria-hidden="true" className="text-stroke-shu font-display text-[10rem] leading-none opacity-30 md:text-[16rem]">
            NEW
          </span>
        </Parallax>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-[auto_1fr] md:gap-20 md:px-8 md:py-36">
          <SlideIn from="left">
            <TateText
              text="温故知新"
              className="font-mincho text-5xl font-extrabold text-washi md:text-7xl"
              charClassName="leading-[1.3]"
            />
          </SlideIn>
          <div>
            <SectionHeading index="02" en="About" ja="天邪鬼とは" />
            <Reveal delay={0.15}>
              <p className="max-w-2xl font-mincho text-base leading-[2.4] text-washi/90 md:text-lg">
                {CONCEPT.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-10 flex flex-wrap gap-3">
                {CONCEPT.keywords.map((kw) => (
                  <li
                    key={kw}
                    className="border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-smoke transition-colors hover:border-shu hover:text-shu"
                  >
                    {kw}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="relative mt-14 max-w-2xl">
                <span
                  aria-hidden="true"
                  className="absolute -top-2.5 -left-2.5 h-full w-full border border-shu/40"
                />
                <Image
                  src={BAND_PHOTOS.vivid}
                  alt="天邪鬼 メンバー3人(バーボン了・アトランティス仁誠・ウノ太一)"
                  width={1600}
                  height={899}
                  className="relative border border-line object-cover"
                />
                <p className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-ash">
                  <span>AMANOJOKER — TOKYO ⇄ KANAGAWA</span>
                  <span className="text-shu">天邪鬼</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <Link
                href="/profile"
                className="group mt-12 inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-washi"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 transition-all duration-300 group-hover:border-shu group-hover:bg-shu group-hover:text-sumi">
                  →
                </span>
                MEMBER &amp; BIOGRAPHY
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MUSIC ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading index="03" en="Music" ja="楽曲紹介" />

        {latestRelease && (
          <Reveal delay={0.05}>
            <div className="mb-14 grid gap-8 border border-line bg-kuro/40 p-6 md:grid-cols-[15rem_1fr] md:p-8">
              <div className="relative w-full max-w-[15rem]">
                <span aria-hidden="true" className="absolute -top-2 -left-2 h-full w-full border border-shu/40" />
                {latestRelease.cover_url && (
                  <img
                    src={latestRelease.cover_url}
                    alt={`${latestRelease.title} ジャケット`}
                    width={600}
                    height={600}
                    className="relative aspect-square w-full border border-line object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <p className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.35em] text-shu">
                  LATEST RELEASE
                  {latestRelease.release_date && (
                    <span className="text-smoke">{fmtDot(latestRelease.release_date)}</span>
                  )}
                  <span className="border border-line-2 px-2 py-0.5 text-smoke">
                    {latestRelease.type.toUpperCase()}
                  </span>
                </p>
                <h3 className="mt-4 font-mincho text-3xl font-extrabold text-washi md:text-4xl">
                  {latestRelease.title}
                </h3>
                {latestRelease.description && (
                  <p className="mt-4 max-w-xl text-xs leading-[1.9] text-smoke">
                    {latestRelease.description}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-5 pt-6">
                  {latestRelease.apple_url && (
                    <a
                      href={latestRelease.apple_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden border border-washi/40 px-6 py-3 font-mono text-[11px] tracking-[0.25em] text-washi transition-colors hover:border-shu"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
                      <span className="relative transition-colors group-hover:text-sumi">
                        ♪ APPLE MUSIC で聴く
                      </span>
                    </a>
                  )}
                  {latestRelease.youtube_url && (
                    <a
                      href={latestRelease.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-sweep font-mono text-[11px] tracking-[0.25em] text-washi/80 hover:text-washi"
                    >
                      ▶ MVを観る
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {songs.slice(0, 3).map((song, i) => (
              <SongRow key={song.id} song={song} index={i} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-end">
            <Link
              href="/music"
              className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-washi"
            >
              ALL SONGS
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 transition-all duration-300 group-hover:border-shu group-hover:bg-shu group-hover:text-sumi">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ LIVE ============ */}
      <section className="border-y border-line bg-kuro/50">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <SectionHeading index="04" en="Live" ja="ライブ情報" />
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
              <div className="relative overflow-hidden border border-dashed border-line-2 px-6 py-14 text-center">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -right-4 font-mincho text-[9rem] leading-none font-extrabold text-washi/[0.04] select-none"
                >
                  鬼
                </span>
                <p className="font-display text-2xl tracking-[0.15em] text-washi md:text-3xl">
                  NEXT SHOW — COMING SOON
                </p>
                <p className="mt-4 text-xs leading-relaxed text-smoke">
                  次回公演は近日発表。最新情報は
                  <a
                    href={SITE.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-1 text-shu underline underline-offset-4 hover:text-shu-bright"
                  >
                    X {SITE.xHandle}
                  </a>
                  にて。
                </p>
              </div>
            </Reveal>
          )}

          {past.length > 0 && (
            <Reveal delay={0.2}>
              <p className="mt-14 mb-2 font-mono text-[10px] tracking-[0.35em] text-ash">
                PAST SHOWS
              </p>
              <div className="border-t border-line">
                {past.map((ev) => (
                  <LiveRow key={ev.id} ev={ev} />
                ))}
              </div>
            </Reveal>
          )}
          <Reveal delay={0.25}>
            <div className="mt-10 flex justify-end">
              <Link
                href="/live"
                className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-washi"
              >
                ALL SCHEDULE
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 transition-all duration-300 group-hover:border-shu group-hover:bg-shu group-hover:text-sumi">
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ DIARY ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionHeading index="05" en="Diary" ja="天邪鬼日記" />
        <div className="grid gap-5 md:grid-cols-3">
          {diary.map((post, i) => (
            <Reveal key={post.id} delay={0.1 + i * 0.12}>
              <DiaryCard post={post} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-end">
            <Link
              href="/diary"
              className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-washi"
            >
              ALL POSTS
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 transition-all duration-300 group-hover:border-shu group-hover:bg-shu group-hover:text-sumi">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============ FOLLOW ============ */}
      <section className="relative overflow-hidden border-t border-line">
        <div
          aria-hidden="true"
          className="animate-pulse-ember pointer-events-none absolute -right-32 -bottom-48 h-[30rem] w-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(126,20,16,0.5) 0%, rgba(126,20,16,0.1) 45%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center md:px-8 md:py-32">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.4em] text-smoke">FOLLOW US</p>
            <a
              href={SITE.x}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-4 md:gap-6"
            >
              <XIcon className="h-8 w-8 text-washi transition-colors group-hover:text-shu md:h-12 md:w-12" />
              <span
                className="glitch font-display text-4xl tracking-[0.08em] text-washi transition-colors group-hover:text-shu md:text-7xl"
                data-text={SITE.xHandle}
              >
                {SITE.xHandle}
              </span>
            </a>
            <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-smoke">
              ライブ告知・日々のあれこれはXでも発信中。
              チケット予約・出演オファーは
              <Link href="/contact" className="mx-1 text-shu underline underline-offset-4">
                コンタクト
              </Link>
              まで。
            </p>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <a
                href={SITE.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep font-mono text-[11px] tracking-[0.25em] text-washi/70 hover:text-washi"
              >
                ♪ APPLE MUSIC
              </a>
              <a
                href={SITE.eggs}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep font-mono text-[11px] tracking-[0.25em] text-washi/70 hover:text-washi"
              >
                ◉ EGGS
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
