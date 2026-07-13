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
    success: "bg-success-50 text-success-600",
    info: "bg-info-50 text-info-600",
  };
  const ringClasses: Record<string, string> = {
    maroon: "from-maroon-400 to-maroon-600",
    gold: "from-gold-300 to-gold-500",
    success: "from-success-500 to-success-600",
    info: "from-info-500 to-info-600",
  };
  const positive = (deltaPercent ?? 0) >= 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", ringClasses[accent])} />
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{label}</span>
        {Icon && (
          <span className={cn("rounded-lg p-2", accentClasses[accent])}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-2xl font-bold text-navy-900">{value}</div>
      {deltaPercent !== undefined && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-semibold",
            positive ? "text-success-600" : "text-danger-600"
          )}
        >
          {positive ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
          {Math.abs(deltaPercent)}%
          <span className="font-normal text-neutral-400">vs last period</span>
        </div>
      )}
    </div>
  );
}
