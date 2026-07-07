import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function StarRating({
  rating,
  reviewCount,
  size = 14,
  className,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="flex items-center gap-0.5 rounded bg-success-500/10 px-1.5 py-0.5 text-xs font-semibold text-success-500">
        {rating.toFixed(1)}
        <Star size={size} className="fill-success-500 text-success-500" />
      </span>
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500">({reviewCount.toLocaleString("en-IN")})</span>
      )}
    </div>
  );
}
