import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const FIELD_BASE =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-navy-900 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/15";

function Label({ children }: { children: ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-neutral-500">{children}</label>;
}

export function Input({
  label,
  className,
  ...props
}: { label?: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const input = <input className={cn(FIELD_BASE, className)} {...props} />;
  if (!label) return input;
  return (
    <div>
      <Label>{label}</Label>
      {input}
    </div>
  );
}

export function Select({
  label,
  className,
  children,
  ...props
}: { label?: string; className?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const select = (
    <div className="relative">
      <select className={cn(FIELD_BASE, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
    </div>
  );
  if (!label) return select;
  return (
    <div>
      <Label>{label}</Label>
      {select}
    </div>
  );
}

export function Textarea({
  label,
  className,
  ...props
}: { label?: string; className?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textarea = <textarea className={cn(FIELD_BASE, "resize-y", className)} {...props} />;
  if (!label) return textarea;
  return (
    <div>
      <Label>{label}</Label>
      {textarea}
    </div>
  );
}
