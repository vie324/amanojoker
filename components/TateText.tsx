/**
 * 縦書き風テキスト。1文字ずつ縦に積むので、フォントの縦書きメトリクス
 * (Google Fonts の日本語 Web フォントでは削除されている)に依存せず、
 * どの端末でも同じ見た目で組める。
 */

const ROTATE = new Set(["ー", "〜", "…", "‥", "—", "–", "-", "(", ")", "「", "」", "→", "←"]);
const PUNCT = new Set(["、", "。"]);

export default function TateText({
  text,
  className = "",
  charClassName = "",
  style,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      role="text"
      aria-label={text}
      style={style}
      className={`inline-flex flex-col items-center ${className}`}
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`block ${
            ROTATE.has(ch)
              ? "rotate-90"
              : PUNCT.has(ch)
                ? "translate-x-[0.55em] -translate-y-[0.55em]"
                : ""
          } ${charClassName}`}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
