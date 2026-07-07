import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  icon: Icon,
  deltaPercent,
  accent = "maroon",
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  deltaPercent?: number;
  accent?: "maroon" | "gold" | "success" | "info";
}) {
  const accentClasses: Record<string, string> = {
    maroon: "bg-maroon-50 text-maroon-600",
    gold: "bg-gold-50 text-gold-600",
    success: "bg-success-500/10 text-success-500",
    info: "bg-info-500/10 text-info-500",
  };
  const positive = (deltaPercent ?? 0) >= 0;

  return (
    <div className="rounded-xl border border-navy-800/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {label}
        </span>
        {Icon && (
          <span className={cn("rounded-lg p-2", accentClasses[accent])}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-bold text-navy-900">{value}</div>
      {deltaPercent !== undefined && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-success-500" : "text-danger-500"
          )}
        >
          {positive ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
          {Math.abs(deltaPercent)}%
        </div>
      )}
    </div>
  );
}
