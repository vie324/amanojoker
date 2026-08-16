import { CheckboxRow, Field, Input, Select, SubmitButton, Textarea } from "@/components/admin/fields";
import { toInputDateTime } from "@/lib/admin";
import type { News } from "@/lib/types";

export default function NewsForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: News;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6">
      <Field label="TITLE / タイトル *">
        <Input name="title" required maxLength={200} defaultValue={item?.title} placeholder="お知らせのタイトル" />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="CATEGORY / 分類">
          <Select name="category" defaultValue={item?.category ?? "info"}>
            <option value="info">INFO — お知らせ</option>
            <option value="release">RELEASE — リリース</option>
            <option value="live">LIVE — ライブ</option>
            <option value="media">MEDIA — メディア/受賞</option>
          </Select>
        </Field>
        <Field label="DATE / 公開日時">
          <Input name="published_at" type="datetime-local" defaultValue={toInputDateTime(item?.published_at)} />
        </Field>
      </div>
      <Field label="BODY / 本文" hint="任意">
        <Textarea name="body" rows={5} defaultValue={item?.body ?? ""} placeholder="本文(任意)" />
      </Field>
      <CheckboxRow name="is_published" label="公開する" defaultChecked={item?.is_published ?? true} />
      <SubmitButton>{item ? "更新する" : "作成する"}</SubmitButton>
    </form>
  );
}
