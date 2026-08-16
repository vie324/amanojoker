import type { ReactNode } from "react";

/**
 * 無限ループのマーキー。items を2セット並べて -50% へ流す。
 */
export default function Marquee({
  items,
  className = "",
  innerClassName = "",
  slow = false,
  repeat = 4,
}: {
  items: ReactNode[];
  className?: string;
  innerClassName?: string;
  slow?: boolean;
  repeat?: number;
}) {
  const half = (
    <div className={`flex w-max shrink-0 items-center ${innerClassName}`}>
      {Array.from({ length: repeat }).flatMap((_, r) =>
        items.map((item, i) => (
          <span key={`${r}-${i}`} className="flex shrink-0 items-center">
            {item}
          </span>
        )),
      )}
    </div>
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {half}
        <div aria-hidden="true" className="contents">
          {half}
        </div>
      </div>
    </div>
  );
}
