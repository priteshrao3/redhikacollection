import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PriceTag({
  price,
  mrp,
  discountPercent,
  size = "md",
  className,
}: {
  price: number;
  mrp?: number;
  discountPercent?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const priceSize = { sm: "text-base", md: "text-xl", lg: "text-3xl" }[size];
  const mrpSize = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-semibold text-maroon-700", priceSize)}>
        {formatPrice(price)}
      </span>
      {mrp && mrp > price && (
        <span className={cn("text-neutral-400 line-through", mrpSize)}>
          {formatPrice(mrp)}
        </span>
      )}
      {discountPercent ? (
        <span className={cn("font-medium text-success-500", mrpSize)}>
          {discountPercent}% OFF
        </span>
      ) : null}
    </div>
  );
}
