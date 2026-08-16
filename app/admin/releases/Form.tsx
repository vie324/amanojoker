import { CheckboxRow, Field, Input, Select, SubmitButton, Textarea } from "@/components/admin/fields";
import type { Release } from "@/lib/types";

export default function ReleaseForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Release;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="TITLE / 作品名 *" className="md:col-span-2">
          <Input name="title" required maxLength={200} defaultValue={item?.title} placeholder="作品タイトル" />
        </Field>
        <Field label="TYPE / 種別">
          <Select name="type" defaultValue={item?.type ?? "single"}>
            <option value="single">SINGLE — シングル</option>
            <option value="ep">EP</option>
            <option value="album">ALBUM — アルバム</option>
            <option value="demo">DEMO — デモ</option>
          </Select>
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="SLUG / URL" hint="空欄なら自動生成">
          <Input name="slug" defaultValue={item?.slug} placeholder="late-show" />
        </Field>
        <Field label="RELEASE DATE / 発売日">
          <Input name="release_date" type="date" defaultValue={item?.release_date ?? ""} />
        </Field>
        <Field label="SORT / 並び順" hint="小さいほど上">
          <Input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
        </Field>
      </div>
      <Field label="COVER URL / ジャケット画像" hint="/images/releases/xxx.jpg または外部URL">
        <Input name="cover_url" defaultValue={item?.cover_url ?? ""} placeholder="/images/releases/late-show.jpg" />
      </Field>
      <Field label="DESCRIPTION / 紹介文">
        <Textarea name="description" rows={4} defaultValue={item?.description ?? ""} placeholder="作品の紹介文。" />
      </Field>
      <Field label="TRACKS / 収録曲" hint="1行に1曲">
        <Textarea
          name="tracks"
          rows={7}
          defaultValue={item?.tracks.join("\n") ?? ""}
          placeholder={"色の砂漠\n朝焼け\nPose"}
        />
      </Field>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="APPLE MUSIC URL">
          <Input name="apple_url" type="url" defaultValue={item?.apple_url ?? ""} placeholder="https://music.apple.com/jp/album/..." />
        </Field>
        <Field label="EGGS URL">
          <Input name="eggs_url" type="url" defaultValue={item?.eggs_url ?? ""} placeholder="https://eggs.mu/..." />
        </Field>
        <Field label="YOUTUBE URL / 代表MV">
          <Input name="youtube_url" type="url" defaultValue={item?.youtube_url ?? ""} placeholder="https://www.youtube.com/watch?v=..." />
        </Field>
      </div>
      <CheckboxRow name="is_published" label="公開する" defaultChecked={item?.is_published ?? true} />
      <SubmitButton>{item ? "更新する" : "追加する"}</SubmitButton>
    </form>
  );
}
