import { CheckboxRow, Field, Input, SubmitButton, Textarea } from "@/components/admin/fields";
import type { LiveEvent } from "@/lib/types";

export default function LiveForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: LiveEvent;
}) {
  return (
    <form action={action} className="max-w-3xl space-y-6">
      <Field label="TITLE / イベント名 *">
        <Input name="title" required maxLength={200} defaultValue={item?.title} placeholder="LIVE at 〇〇" />
      </Field>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="DATE / 日付 *">
          <Input name="date" type="date" required defaultValue={item?.date} />
        </Field>
        <Field label="OPEN">
          <Input name="open_time" maxLength={10} defaultValue={item?.open_time ?? ""} placeholder="18:00" />
        </Field>
        <Field label="START">
          <Input name="start_time" maxLength={10} defaultValue={item?.start_time ?? ""} placeholder="18:30" />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Field label="VENUE / 会場 *" className="md:col-span-2">
          <Input name="venue" required maxLength={200} defaultValue={item?.venue} placeholder="下北沢〇〇" />
        </Field>
        <Field label="AREA / エリア">
          <Input name="area" maxLength={20} defaultValue={item?.area ?? ""} placeholder="東京 / 神奈川" />
        </Field>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="TICKET / チケット">
          <Input name="ticket_price" maxLength={100} defaultValue={item?.ticket_price ?? ""} placeholder="前売 ¥2,000 / 当日 ¥2,500" />
        </Field>
        <Field label="LINK URL / 詳細リンク">
          <Input name="link_url" type="url" defaultValue={item?.link_url ?? ""} placeholder="https://..." />
        </Field>
      </div>
      <Field label="NOTE / 備考" hint="出演者、注意事項など">
        <Textarea name="note" rows={3} defaultValue={item?.note ?? ""} placeholder="共演: 〇〇 / △△" />
      </Field>
      <CheckboxRow name="is_published" label="公開する" defaultChecked={item?.is_published ?? true} />
      <SubmitButton>{item ? "更新する" : "追加する"}</SubmitButton>
    </form>
  );
}
