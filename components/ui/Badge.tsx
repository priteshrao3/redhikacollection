import { cn } from "@/lib/cn";

type BadgeVariant = "maroon" | "gold" | "success" | "warning" | "danger" | "neutral";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  maroon: "bg-maroon-600 text-white",
  gold: "bg-gold-500 text-white",
  success: "bg-success-500/10 text-success-500",
  warning: "bg-warning-500/10 text-warning-500",
  danger: "bg-danger-500/10 text-danger-500",
  neutral: "bg-navy-100 text-navy-800",
};

export function Badge({
  children,
  variant = "maroon",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
