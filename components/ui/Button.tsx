import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-shine bg-maroon-600 text-white shadow-sm hover:bg-maroon-700 hover:shadow-md",
  outline: "border border-gold-400 text-white hover:border-gold-300 hover:bg-white/10",
  ghost: "border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-wide transition-all duration-200 active:scale-[0.97]";

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}>
      {children}
    </Link>
  );
}
