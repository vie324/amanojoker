import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <span
        aria-hidden="true"
        className="text-stroke pointer-events-none absolute font-mincho text-[60vw] leading-none font-extrabold opacity-40 select-none md:text-[34rem]"
      >
        鬼
      </span>
      <p className="relative font-display text-7xl tracking-[0.1em] text-shu md:text-9xl">404</p>
      <p className="relative mt-6 font-mincho text-lg font-bold text-washi md:text-2xl">
        お探しのページは、あまのじゃくにも見つかりません。
      </p>
      <p className="relative mt-3 font-mono text-[10px] tracking-[0.3em] text-smoke">
        PAGE NOT FOUND — IT&apos;S BEING CONTRARY.
      </p>
      <Link
        href="/"
        className="group relative mt-10 overflow-hidden border border-washi/40 px-8 py-3.5 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
      >
        <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
        <span className="relative transition-colors group-hover:text-sumi">← BACK TO HOME</span>
      </Link>
    </section>
  );
}
