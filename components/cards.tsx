import Link from "next/link";
import type { DiaryPost, LiveEvent, News, Song } from "@/lib/types";
import { fmtDot, fmtParts, isUpcoming } from "@/lib/format";

/* ============ NEWS ============ */

const CATEGORY_LABEL: Record<string, string> = {
  info: "INFO",
  release: "RELEASE",
  live: "LIVE",
  media: "MEDIA",
};

export function NewsRow({ item }: { item: News }) {
  return (
    <article className="group grid gap-2 border-b border-line py-6 transition-colors hover:bg-kuro/60 md:grid-cols-[8.5rem_6rem_1fr] md:gap-6 md:px-4">
      <time className="font-mono text-xs tracking-[0.15em] text-smoke">
        {fmtDot(item.published_at)}
      </time>
      <span className="w-fit border border-line-2 px-2 py-0.5 font-mono text-[10px] tracking-[0.2em] text-shu">
        {CATEGORY_LABEL[item.category] ?? item.category.toUpperCase()}
      </span>
      <div>
        <h3 className="text-sm font-bold text-washi transition-colors group-hover:text-shu-bright md:text-base">
          {item.title}
        </h3>
        {item.body && (
          <p className="mt-2 text-xs leading-relaxed text-smoke md:text-[13px]">{item.body}</p>
        )}
      </div>
    </article>
  );
}

/* ============ SONG ============ */

export function SongRow({ song, index }: { song: Song; index: number }) {
  return (
    <Link
      href={`/music/${song.slug}`}
      className="group relative grid items-center gap-x-6 gap-y-2 overflow-hidden border-b border-line py-7 pr-4 transition-colors hover:bg-kuro/60 md:grid-cols-[5rem_1fr_auto] md:py-9"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
        style={{ backgroundColor: song.accent_color ?? "#e63a21" }}
      />
      <span className="pl-4 font-display text-3xl text-ash transition-colors group-hover:text-shu md:text-4xl">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="pl-4 md:pl-0">
        <h3 className="font-mincho text-xl font-bold text-washi transition-colors group-hover:text-shu-bright md:text-3xl">
          {song.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
          {song.reading && (
            <span className="font-mono text-[10px] tracking-[0.25em] text-ash">
              {song.reading}
            </span>
          )}
          {song.release && (
            <span className="font-mono text-[10px] tracking-[0.15em] text-smoke">
              {song.release}
            </span>
          )}
        </p>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {song.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="border border-line-2 px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-smoke"
          >
            {tag}
          </span>
        ))}
        <span className="ml-3 font-mono text-sm text-shu opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          →
        </span>
      </div>
    </Link>
  );
}

/* ============ LIVE ============ */

export function LiveRow({ ev }: { ev: LiveEvent }) {
  const d = fmtParts(ev.date);
  const upcoming = isUpcoming(ev.date);
  return (
    <article
      className={`group relative grid grid-cols-[6rem_1fr] items-center gap-4 border-b border-dashed border-line-2 py-6 transition-colors hover:bg-kuro/60 md:grid-cols-[8rem_1fr_auto] md:gap-8 md:px-4 ${
        upcoming ? "" : "opacity-80"
      }`}
    >
      <div className="border-r border-line pr-4 text-center md:pr-8">
        <p className="font-mono text-[10px] tracking-[0.2em] text-ash">{d.y}</p>
        <p className={`font-display text-3xl md:text-4xl ${upcoming ? "text-shu" : "text-washi/80"}`}>
          {d.m}.{d.day}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-smoke">({d.w})</p>
      </div>
      <div>
        {upcoming && (
          <span className="mb-2 inline-block bg-shu px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] text-sumi">
            UPCOMING
          </span>
        )}
        <h3 className="text-sm font-bold text-washi md:text-lg">{ev.title}</h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-smoke">
          <span className="font-mincho">{ev.venue}</span>
          {ev.area && (
            <span className="border border-line-2 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.2em]">
              {ev.area}
            </span>
          )}
          {(ev.open_time || ev.start_time) && (
            <span className="font-mono text-[10px] tracking-[0.15em]">
              {ev.open_time && `OPEN ${ev.open_time}`}
              {ev.open_time && ev.start_time && " / "}
              {ev.start_time && `START ${ev.start_time}`}
            </span>
          )}
          {ev.ticket_price && (
            <span className="font-mono text-[10px] tracking-[0.15em]">{ev.ticket_price}</span>
          )}
        </p>
        {ev.note && <p className="mt-2 text-xs leading-relaxed text-smoke">{ev.note}</p>}
      </div>
      {ev.link_url && (
        <a
          href={ev.link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden border border-line-2 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-washi/80 transition-colors hover:border-shu hover:text-shu md:block"
        >
          DETAIL →
        </a>
      )}
    </article>
  );
}

/* ============ DIARY ============ */

export function DiaryCard({ post }: { post: DiaryPost }) {
  const excerpt = post.body
    .replace(/[#>*`\-]/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 72);
  return (
    <Link
      href={`/diary/${post.slug}`}
      className="group relative flex flex-col overflow-hidden border border-line bg-kuro/40 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-shu/60 md:p-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -bottom-7 font-mincho text-[7rem] leading-none font-extrabold text-washi/[0.05] transition-all duration-500 group-hover:text-shu/10"
      >
        {post.cover_kanji ?? "記"}
      </span>
      <div className="flex items-center justify-between">
        <time className="font-mono text-[10px] tracking-[0.25em] text-smoke">
          {fmtDot(post.published_at)}
        </time>
        {post.mood && (
          <span className="border border-line-2 px-2 py-0.5 font-mono text-[9px] tracking-[0.15em] text-smoke">
            {post.mood}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-mincho text-lg leading-snug font-bold text-washi transition-colors group-hover:text-shu-bright md:text-xl">
        {post.title}
      </h3>
      <p className="mt-3 text-xs leading-relaxed text-smoke">{excerpt}…</p>
      <p className="mt-auto flex items-center justify-between pt-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
          {post.author ?? "天邪鬼"}
        </span>
        <span className="font-mono text-xs text-shu transition-transform duration-300 group-hover:translate-x-1">
          READ →
        </span>
      </p>
    </Link>
  );
}
