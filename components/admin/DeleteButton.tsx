"use client";

export default function DeleteButton({
  action,
  label = "削除",
  confirmText = "本当に削除しますか?この操作は取り消せません。",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="border border-line-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-smoke transition-colors hover:border-shu hover:text-shu"
      >
        {label}
      </button>
    </form>
  );
}
