import { CheckboxRow, Field, Input, SubmitButton, Textarea } from "@/components/admin/fields";
import { toInputDateTime } from "@/lib/admin";
import type { DiaryPost } from "@/lib/types";

export default function DiaryForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: DiaryPost;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      <Field label="TITLE / タイトル *">
        <Input name="title" required maxLength={200} defaultValue={item?.title} placeholder="日記のタイトル" />
      </Field>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="SLUG / URL" hint="空欄なら自動生成">
          <Input name="slug" defaultValue={item?.slug} placeholder="my-first-post" />
        </Field>
        <Field label="AUTHOR / 書いた人">
          <Input name="author" maxLength={50} defaultValue={item?.author ?? "ウノ太一"} />
        </Field>
        <Field label="DATE / 公開日時">
          <Input name="published_at" type="datetime-local" defaultValue={toInputDateTime(item?.published_at)} />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="MOOD / 気分" hint="カードに表示 (任意)">
          <Input name="mood" maxLength={20} defaultValue={item?.mood ?? ""} placeholder="上機嫌 / 夜型 など" />
        </Field>
        <Field label="COVER KANJI / 表紙の一文字" hint="カードの透かしに使う漢字1字">
          <Input name="cover_kanji" maxLength={1} defaultValue={item?.cover_kanji ?? ""} placeholder="鬼" />
        </Field>
      </div>
      <Field label="BODY / 本文 *" hint="Markdown 対応 (## 見出し、> 引用、- リストなど)">
        <Textarea name="body" required rows={16} defaultValue={item?.body} placeholder="今日のことを書く。" />
      </Field>
      <CheckboxRow name="is_published" label="公開する" defaultChecked={item?.is_published ?? true} />
      <SubmitButton>{item ? "更新する" : "投稿する"}</SubmitButton>
    </form>
  );
}
