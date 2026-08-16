"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import SealLogo from "./SealLogo";
import TateText from "./TateText";
import XIcon from "./XIcon";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-sumi/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="天邪鬼 AMANOJOKER ホーム"
          >
            <SealLogo className="h-9 w-9 text-shu transition-transform duration-500 group-hover:rotate-[352deg] md:h-10 md:w-10" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-[0.18em] text-washi md:text-xl">
                AMANOJOKER
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-[0.3em] text-smoke">
                →NEW OLD← ROCK&apos;N&apos;ROLL
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="メインナビゲーション">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`link-sweep font-mono text-xs tracking-[0.22em] transition-colors ${
                  isActive(item.href) ? "text-shu" : "text-washi/80 hover:text-washi"
                }`}
              >
                {item.labelEn}
              </Link>
            ))}
            <a
              href={SITE.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`X ${SITE.xHandle}`}
              className="text-washi/80 transition-colors hover:text-shu"
            >
              <XIcon className="h-4 w-4" />
            </a>
          </nav>

          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            className="relative z-[70] flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span
              className={`h-px w-7 bg-washi transition-all duration-300 ${
                open ? "translate-y-[4px] rotate-45 bg-shu" : ""
              }`}
            />
            <span
              className={`h-px w-7 bg-washi transition-all duration-300 ${
                open ? "-translate-y-[4px] -rotate-45 bg-shu" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto bg-sumi/97 backdrop-blur-lg lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-2 flex items-center"
            >
              <TateText
                text="天邪鬼"
                className="font-mincho text-[26vh] font-extrabold text-washi/[0.04]"
                charClassName="leading-[1.04]"
              />
            </div>
            <nav
              className="mt-28 flex flex-col gap-2 px-8"
              aria-label="モバイルナビゲーション"
            >
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 border-b border-line py-4"
                  >
                    <span className="font-mono text-[10px] text-shu">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-4xl tracking-wider uppercase transition-colors group-hover:text-shu ${
                        isActive(item.href) ? "text-shu" : "text-washi"
                      }`}
                    >
                      {item.labelEn}
                    </span>
                    <span className="font-mincho text-sm text-smoke">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between px-8 pb-10"
            >
              <a
                href={SITE.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-smoke hover:text-shu"
              >
                <XIcon className="h-4 w-4" /> {SITE.xHandle}
              </a>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ash">
                EST.2013 TOKYO
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
