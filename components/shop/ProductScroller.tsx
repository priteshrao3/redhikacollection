"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/shop/ProductCard";

export function ProductScroller({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-neutral-500">
        No products found. Try a different filter.
      </div>
    );
  }

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="group/scroller relative">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-navy-900 opacity-0 shadow-md transition-opacity duration-200 group-hover/scroller:opacity-100 sm:flex"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 md:gap-5"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[46vw] shrink-0 snap-start sm:w-[calc(33.33%-1rem)] lg:w-[calc(20%-1rem)]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-neutral-200 bg-white text-navy-900 opacity-0 shadow-md transition-opacity duration-200 group-hover/scroller:opacity-100 sm:flex"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
