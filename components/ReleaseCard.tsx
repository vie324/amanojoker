/* eslint-disable @next/next/no-img-element */
import type { Release } from "@/lib/types";
import { fmtDot } from "@/lib/format";

const TYPE_LABEL: Record<string, string> = {
  single: "SINGLE",
  ep: "EP",
  album: "ALBUM",
  demo: "DEMO",
};

/** 配信作品カード。ジャケット + 収録曲 + Apple Music への直リンク */
export default function ReleaseCard({ release }: { release: Release }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-line bg-kuro/40 transition-all duration-500 hover:-translate-y-1 hover:border-shu/60">
      {/* jacket */}
      <div className="relative overflow-hidden">
        {release.cover_url ? (
          <img
            src={release.cover_url}
            alt={`${release.title} ジャケット`}
            width={600}
            height={600}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-kuro-2">
            <span className="font-mincho text-6xl font-extrabold text-washi/10">盤</span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-shu px-2.5 py-1 font-mono text-[10px] tracking-[0.25em] text-sumi">
          {TYPE_LABEL[release.type] ?? release.type.toUpperCase()}
        </span>
        {release.release_date && (
          <span className="absolute right-3 bottom-3 bg-sumi/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-washi backdrop-blur-sm">
            {fmtDot(release.release_date)}
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-mincho text-xl font-extrabold text-washi transition-colors group-hover:text-shu-bright md:text-2xl">
          {release.title}
        </h3>
        {release.description && (
          <p className="mt-3 text-xs leading-[1.9] text-smoke">{release.description}</p>
        )}

        {release.tracks.length > 0 && (
          <ol className="mt-5 space-y-1.5 border-t border-line pt-4">
            {release.tracks.map((t, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-shu">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-washi/85">{t}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
          {release.apple_url && (
            <a
              href={release.apple_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative overflow-hidden border border-washi/40 px-5 py-2.5 font-mono text-[10px] tracking-[0.22em] text-washi transition-colors hover:border-shu"
            >
              <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover/btn:translate-x-0" />
              <span className="relative transition-colors group-hover/btn:text-sumi">
                ♪ APPLE MUSIC ↗
              </span>
            </a>
          )}
          {release.youtube_url && (
            <a
              href={release.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-mono text-[10px] tracking-[0.2em] text-washi/70 hover:text-washi"
            >
              ▶ MV
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
