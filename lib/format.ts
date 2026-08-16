/** 日付まわりのフォーマッタ(JST 前提の表示用) */

const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];

function toDate(value: string): Date {
  // "YYYY-MM-DD" は UTC 深夜扱いになるので正午 JST に固定してズレを防ぐ
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(`${value}T12:00:00+09:00`);
  return new Date(value);
}

/** 2026.08.16 */
export function fmtDot(value: string): string {
  const d = toDate(value);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

/** { y: "2026", md: "08.16", w: "日" } — ライブのチケット風表示に */
export function fmtParts(value: string) {
  const d = toDate(value);
  return {
    y: String(d.getFullYear()),
    m: String(d.getMonth() + 1).padStart(2, "0"),
    day: String(d.getDate()).padStart(2, "0"),
    w: WEEKDAYS_JA[d.getDay()],
  };
}

export function isUpcoming(dateStr: string): boolean {
  const d = toDate(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return d.getTime() >= now.getTime();
}
