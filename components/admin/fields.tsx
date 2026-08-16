import type { ReactNode } from "react";

/** 管理画面のフォーム部品 */

export const inputClass =
  "w-full border border-line-2 bg-kuro/70 px-3.5 py-2.5 text-sm text-washi placeholder:text-ash focus:border-shu focus:outline-none transition-colors";

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-smoke">{label}</span>
        {hint && <span className="text-[10px] text-ash">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} font-mono text-[13px] leading-relaxed ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${inputClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

export function CheckboxRow({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3 border border-line-2 px-4 py-2.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-[#e63a21]"
      />
      <span className="font-mono text-[11px] tracking-[0.2em] text-washi">{label}</span>
    </label>
  );
}

export function SubmitButton({ children = "保存する" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="group relative overflow-hidden border border-washi/40 px-8 py-3 font-mono text-xs tracking-[0.25em] text-washi transition-colors hover:border-shu"
    >
      <span className="absolute inset-0 -translate-x-full bg-shu transition-transform duration-400 ease-out group-hover:translate-x-0" />
      <span className="relative transition-colors group-hover:text-sumi">{children}</span>
    </button>
  );
}

export function AdminNotice({ saved, error }: { saved?: string; error?: string }) {
  if (saved) {
    return (
      <p className="mb-6 border border-line-2 bg-kuro/60 px-4 py-3 font-mono text-xs tracking-[0.15em] text-washi">
        ✓ 保存しました
      </p>
    );
  }
  if (error) {
    return (
      <p role="alert" className="mb-6 border border-shu/60 bg-blood/20 px-4 py-3 text-xs text-shu-bright">
        エラー: {decodeURIComponent(error)}
      </p>
    );
  }
  return null;
}
