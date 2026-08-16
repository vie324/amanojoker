/** 朱印風ロゴ。currentColor で着色されるので text-shu 等で色を制御する */
export default function SealLogo({
  className = "h-10 w-10",
  title = "天邪鬼",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      style={{ transform: "rotate(-3deg)" }}
    >
      <circle
        cx="32"
        cy="32"
        r="28.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeDasharray="150 4 12 3"
        strokeLinecap="round"
      />
      <g
        fill="currentColor"
        fontFamily="'Shippori Mincho B1', 'Hiragino Mincho ProN', serif"
        fontWeight="800"
        fontSize="15.5"
        textAnchor="middle"
      >
        <text x="32" y="20.5">天</text>
        <text x="32" y="37.5">邪</text>
        <text x="32" y="54.5">鬼</text>
      </g>
    </svg>
  );
}
