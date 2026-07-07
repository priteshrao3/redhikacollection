import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductScroller } from "@/components/shop/ProductScroller";

export function ProductRail({
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">{title}</h2>
          <div className="gold-divider mx-auto mt-2 sm:mx-0" />
          {subtitle && <p className="mt-2.5 text-sm text-neutral-500">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-maroon-600 hover:text-maroon-700 sm:flex"
          >
            View All <ArrowRight size={15} />
          </Link>
        )}
      </div>
      <ProductScroller products={products} />
      {viewAllHref && (
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href={viewAllHref}
            className="flex items-center gap-1.5 text-sm font-semibold text-maroon-600 hover:text-maroon-700"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </section>
  );
}
