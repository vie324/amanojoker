import { Reveal } from "./motion";

/**
 * セクション見出し。通し番号 + 英語大見出し + 日本語ラベル。
 */
export default function SectionHeading({
  index,
  en,
  ja,
  align = "left",
}: {
  index: string;
  en: string;
  ja: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div
        className={`mb-10 flex items-end gap-5 md:mb-14 ${
          align === "center" ? "justify-center text-center" : ""
        }`}
      >
        <span className="font-mono text-xs text-shu md:text-sm">({index})</span>
        <h2 className="font-display text-5xl leading-[0.9] tracking-wide text-washi uppercase md:text-7xl">
          {en}
        </h2>
        <span className="mb-1 border-l-2 border-shu pl-3 font-mincho text-sm font-bold text-smoke md:text-base">
          {ja}
        </span>
      </div>
    </Reveal>
  );
}
