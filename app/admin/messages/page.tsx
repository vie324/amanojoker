import DeleteButton from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/fields";
import { requireUser } from "@/lib/admin";
import { fmtDot } from "@/lib/format";
import type { ContactMessage } from "@/lib/types";
import { deleteMessage } from "./actions";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { saved, error } = await searchParams;
  const { sb } = await requireUser();
  const { data } = await sb
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  const items = (data ?? []) as ContactMessage[];

  return (
    <div>
      <h1 className="mb-2 font-mincho text-2xl font-extrabold text-washi">受信箱</h1>
      <p className="mb-8 text-xs text-smoke">
        コンタクトフォームから届いたメッセージ。返信は各メールアドレス宛にどうぞ。
      </p>
      <AdminNotice saved={saved} error={error} />
      {items.length === 0 ? (
        <p className="border border-dashed border-line-2 px-6 py-12 text-center text-xs text-smoke">
          受信箱は空です。
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((m) => (
            <li key={m.id} className="border border-line bg-kuro/40 p-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[10px] text-ash">{fmtDot(m.created_at)}</span>
                <span className="text-sm font-bold text-washi">{m.name}</span>
                <a href={`mailto:${m.email}`} className="font-mono text-[11px] text-shu hover:text-shu-bright">
                  {m.email}
                </a>
                <span className="ml-auto">
                  <DeleteButton action={deleteMessage.bind(null, m.id)} />
                </span>
              </div>
              {m.subject && (
                <p className="mt-3 border-l-2 border-shu pl-3 text-xs font-bold text-washi">
                  {m.subject}
                </p>
              )}
              <p className="mt-3 text-xs leading-relaxed whitespace-pre-wrap text-smoke">{m.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
