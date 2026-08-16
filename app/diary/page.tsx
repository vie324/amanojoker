import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { DiaryCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { getDiaryPosts } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "天邪鬼日記",
  description:
    "天邪鬼 Amanojoker のメンバー日記。ライブの反省文、曲づくりの与太話、日々のあれこれ。更新は気まぐれ、内容は本音の裏返し。",
};

export default async function DiaryPage() {
  const posts = await getDiaryPosts();

  return (
    <>
      <PageHero
        en="Diary"
        ja="天邪鬼日記"
        kanji="記"
        description="更新は気まぐれ、内容は本音の裏返し。天邪鬼の日記とはそういうものである。"
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {posts.length === 0 ? (
          <Reveal>
            <p className="border border-dashed border-line-2 px-6 py-16 text-center text-sm text-smoke">
              まだ日記がありません。そのうち書きます。たぶん。
            </p>
          </Reveal>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={0.08 * (i % 3)}>
                <DiaryCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
