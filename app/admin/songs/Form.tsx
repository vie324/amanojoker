import { CheckboxRow, Field, Input, SubmitButton, Textarea } from "@/components/admin/fields";
import type { Song } from "@/lib/types";

export default function SongForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: Song;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="TITLE / 曲名 *">
          <Input name="title" required maxLength={200} defaultValue={item?.title} placeholder="曲名" />
        </Field>
        <Field label="READING / 読み">
          <Input name="reading" maxLength={200} defaultValue={item?.reading ?? ""} placeholder="よみがな" />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="SLUG / URL" hint="空欄なら自動生成">
          <Input name="slug" defaultValue={item?.slug} placeholder="song-title" />
        </Field>
        <Field label="RELEASE / 収録作品">
          <Input name="release" maxLength={200} defaultValue={item?.release ?? ""} placeholder="Late Show (2019)" />
        </Field>
        <Field label="TRACK NO.">
          <Input name="track_no" type="number" min={1} defaultValue={item?.track_no ?? ""} />
        </Field>
      </div>
      <Field label="CATCH COPY / キャッチコピー" hint="詳細ページに大きく表示される一言">
        <Input name="catch_copy" maxLength={100} defaultValue={item?.catch_copy ?? ""} placeholder="この曲を一言で。" />
      </Field>
      <Field label="DESCRIPTION / 紹介文" hint="Markdown 対応">
        <Textarea name="description" rows={8} defaultValue={item?.description ?? ""} placeholder="曲の背景、聴きどころなど。" />
      </Field>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="TAGS" hint="カンマ区切り">
          <Input name="tags" defaultValue={item?.tags.join(", ") ?? ""} placeholder="GUITAR ROCK, TANGO" />
        </Field>
        <Field label="DURATION / 尺">
          <Input name="duration" maxLength={20} defaultValue={item?.duration ?? ""} placeholder="4:32" />
        </Field>
        <Field label="ACCENT COLOR" hint="詳細ページの差し色">
          <div className="flex items-center gap-3">
            <Input
              name="accent_color"
              type="color"
              defaultValue={item?.accent_color ?? "#e63a21"}
              className="h-11 w-20 cursor-pointer p-1"
            />
          </div>
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="APPLE MUSIC URL" hint="トラックURL">
          <Input name="apple_url" type="url" defaultValue={item?.apple_url ?? ""} placeholder="https://music.apple.com/jp/album/...?i=..." />
        </Field>
        <Field label="YOUTUBE URL / MV" hint="設定するとMVが埋め込まれる">
          <Input name="youtube_url" type="url" defaultValue={item?.youtube_url ?? ""} placeholder="https://youtube.com/watch?v=..." />
        </Field>
        <Field label="EGGS URL">
          <Input name="eggs_url" type="url" defaultValue={item?.eggs_url ?? ""} placeholder="https://eggs.mu/..." />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="SORT ORDER / 並び順" hint="小さいほど上に表示">
          <Input name="sort_order" type="number" defaultValue={item?.sort_order ?? 0} />
        </Field>
      </div>
      <CheckboxRow name="is_published" label="公開する" defaultChecked={item?.is_published ?? true} />
      <SubmitButton>{item ? "更新する" : "追加する"}</SubmitButton>
    </form>
  );
}
