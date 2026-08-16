import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} ${SITE.nameEn} | OFFICIAL WEBSITE`,
    template: `%s | ${SITE.name} ${SITE.nameEn}`,
  },
  description: SITE.description,
  keywords: ["天邪鬼", "Amanojoker", "ロックバンド", "ライブ", "東京", "神奈川", "NEW OLD"],
  openGraph: {
    title: `${SITE.name} ${SITE.nameEn}`,
    description: SITE.description,
    url: SITE.url,
    siteName: `${SITE.name} ${SITE.nameEn}`,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} ${SITE.nameEn}`,
    description: SITE.description,
    site: SITE.xHandle,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0908",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Shippori+Mincho+B1:wght@400;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
        />
      </head>
      <body className="grain bg-sumi text-washi antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-shu focus:px-4 focus:py-2 focus:text-sumi"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
