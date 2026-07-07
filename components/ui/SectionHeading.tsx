import { cn } from "@/lib/cn";

const TITLE_SIZE_CLASSES = {
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  size = "md",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  size?: "md" | "lg";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)}>
      <p className="section-eyebrow">{eyebrow}</p>
      <div className={cn("gold-divider mt-2.5", isCenter && "gold-divider--center")} />
      <h2 className={cn("mt-3 font-display text-navy-900", TITLE_SIZE_CLASSES[size])}>{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}
