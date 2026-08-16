"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SITE } from "@/lib/site";
import { StaggerChars } from "./motion";
import RotatingBadge from "./RotatingBadge";
import TateText from "./TateText";
import XIcon from "./XIcon";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* ember glow */}
      <div
        aria-hidden="true"
        className="animate-pulse-ember pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(126,20,16,0.55) 0%, rgba(126,20,16,0.12) 45%, transparent 70%)",
        }}
      />
      {/* giant vertical kanji backdrop */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.4 }}
        className="pointer-events-none absolute inset-y-0 right-[4vw] hidden items-center md:flex"
      >
        <TateText
          text="天邪鬼"
          className="text-stroke font-mincho text-[26vh] font-extrabold select-none"
          charClassName="leading-[1.06]"
        />
      </motion.div>

      {/* hairline frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 inset-y-20 border border-line/60 md:inset-x-8"
      />

      <div className="relative mx-auto w-full max-w-7xl px-8 pt-24 pb-16 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mb-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-smoke md:text-xs"
        >
          <span className="inline-block h-px w-10 bg-shu" />
          OFFICIAL WEBSITE — EST.2013 TAKADANOBABA
        </motion.p>

        <h1 className="select-none">
          <StaggerChars
            text="天邪鬼"
            delay={0.25}
            step={0.14}
            className="block font-mincho text-[clamp(4.5rem,16vw,11rem)] leading-[1.02] font-extrabold tracking-[0.06em] text-washi"
          />
          <span className="mt-2 block font-display text-[clamp(2.2rem,7.5vw,5.2rem)] leading-none tracking-[0.04em]">
            <StaggerChars text="AMANO" delay={0.8} step={0.05} className="text-washi" />
            <StaggerChars text="JOKER" delay={1.1} step={0.05} className="text-shu" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="animate-flicker mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.3em] text-washi/90 md:text-sm"
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-shu"
          >
            →
          </motion.span>
          NEW OLD
          <motion.span
            animate={{ x: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-shu"
          >
            ←
          </motion.span>
          ROCK&apos;N&apos;ROLL MUSIC
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: EASE }}
          className="mt-6 max-w-md text-sm leading-loose text-smoke"
        >
          21世紀に入って失われた、しぶといロックのサウンドを
          全く新しい形で体現する温故知新型ロックバンド。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.15, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/live"
            className="group relative overflow-hidden border border-washi/40 px-7 py-3 font-mono text-xs tracking-[0.25em] text-washi transition-colors duration-300 hover:border-shu"
          >
            <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
            <span className="relative transition-colors duration-300 group-hover:text-sumi">
              LIVE INFO →
            </span>
          </Link>
          <Link
            href="/music"
            className="link-sweep font-mono text-xs tracking-[0.25em] text-washi/80 hover:text-washi"
          >
            LISTEN MUSIC
          </Link>
          <a
            href={SITE.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`X ${SITE.xHandle}`}
            className="flex h-10 w-10 items-center justify-center border border-line text-washi/70 transition-all hover:border-shu hover:text-shu"
          >
            <XIcon className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* bottom row: scroll cue + badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="pointer-events-none absolute inset-x-8 bottom-8 flex items-end justify-between md:inset-x-14"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.4em] text-ash">
          SCROLL
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-x-0 h-1/2 bg-shu"
            />
          </span>
        </div>
        <RotatingBadge className="hidden h-24 w-24 md:block lg:h-28 lg:w-28" />
      </motion.div>
    </section>
  );
}
