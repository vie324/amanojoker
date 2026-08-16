import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import SealLogo from "./SealLogo";
import XIcon from "./XIcon";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* marquee divider */}
      <Marquee
        className="border-b border-line py-3"
        slow
        items={[
          <span key="a" className="mx-6 font-mono text-[11px] tracking-[0.3em] text-ash">
            →NEW OLD← ROCK&apos;N&apos;ROLL MUSIC
          </span>,
          <span key="b" className="mx-6 font-mincho text-[11px] font-bold text-shu/70">
            天邪鬼
          </span>,
          <span key="c" className="mx-6 font-mono text-[11px] tracking-[0.3em] text-ash">
            AMANOJOKER
          </span>,
          <span key="d" className="mx-6 text-[11px] text-ash">
            ★
          </span>,
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 md:px-8">
        {/* giant ghost text */}
        <p
          aria-hidden="true"
          className="text-stroke pointer-events-none absolute -top-2 left-0 w-full font-display text-[18vw] leading-none tracking-tight whitespace-nowrap opacity-[0.16] select-none md:text-[13rem]"
        >
          AMANOJOKER
        </p>

        <div className="relative grid gap-12 pt-20 md:grid-cols-[1.2fr_1fr_1fr] md:pt-28">
          <div>
            <div className="flex items-center gap-4">
              <SealLogo className="h-14 w-14 text-shu" />
              <div>
                <p className="font-mincho text-2xl font-extrabold text-washi">天邪鬼</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.35em] text-smoke">
                  AMANOJOKER
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-smoke">
              21世紀に失われた、しぶといロックを全く新しい形で。
              温故知新型ロックンロールバンド。東京⇄神奈川。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション">
            <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ash">SITEMAP</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-2 text-sm text-washi/80 transition-colors hover:text-shu"
                  >
                    <span className="font-mono text-[10px] text-shu opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em]">{item.labelEn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ash">FOLLOW / LISTEN</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-washi/80 transition-colors hover:text-shu"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="font-mono text-xs tracking-[0.15em]">{SITE.xHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.eggs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-washi/80 transition-colors hover:text-shu"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px]">
                    e
                  </span>
                  <span className="font-mono text-xs tracking-[0.15em]">Eggs — 楽曲試聴</span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 text-sm text-washi/80 transition-colors hover:text-shu"
                >
                  <span className="text-xs">✉</span>
                  <span className="font-mono text-xs tracking-[0.15em]">
                    チケット予約 / 出演オファー
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 md:flex-row">
          <p className="font-mono text-[10px] tracking-[0.2em] text-ash">
            © {new Date().getFullYear()} 天邪鬼 AMANOJOKER. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">
            EST.2013 TAKADANOBABA — TOKYO ⇄ KANAGAWA
          </p>
        </div>
      </div>
    </footer>
  );
}
