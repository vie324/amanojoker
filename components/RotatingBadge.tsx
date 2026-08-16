/** 回転する円形テキストバッジ */
export default function RotatingBadge({
  className = "h-28 w-28",
  text = "→NEW OLD← ROCK'N'ROLL MUSIC ・ AMANOJOKER ・",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-smoke font-mono" style={{ fontSize: "8.2px", letterSpacing: "0.18em" }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mincho text-2xl font-extrabold text-shu">
        鬼
      </span>
    </div>
  );
}
