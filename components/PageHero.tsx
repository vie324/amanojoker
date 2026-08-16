import { Reveal, StaggerChars } from "./motion";

/**
 * 下層ページ共通ヒーロー。巨大英字 + 日本語 + 背景の透かし漢字。
 */
export default function PageHero({
  en,
  ja,
  kanji,
  description,
}: {
  en: string;
  ja: string;
  kanji: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-28 pb-14 md:pt-40 md:pb-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 font-mincho text-[16rem] leading-none font-extrabold text-washi/[0.04] select-none md:-top-16 md:text-[26rem]"
      >
        {kanji}
      </span>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-shu">
            <span className="inline-block h-px w-8 bg-shu" />
            AMANOJOKER — {en}
          </p>
        </Reveal>
        <h1 className="flex flex-wrap items-end gap-x-6 gap-y-2">
          <StaggerChars
            text={en}
            step={0.045}
            className="font-display text-6xl leading-[0.9] tracking-wide text-washi uppercase md:text-[7rem]"
          />
          <span className="mb-2 border-l-2 border-shu pl-4 font-mincho text-base font-bold text-smoke md:text-xl">
            {ja}
          </span>
        </h1>
        {description && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-xs leading-loose text-smoke md:text-sm">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
