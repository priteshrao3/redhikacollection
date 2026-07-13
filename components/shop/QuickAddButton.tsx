"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/api/analytics";
import { showToast } from "@/components/shop/Toast";
import { cn } from "@/lib/cn";

export function QuickAddButton({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={outOfStock}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          productId: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          qty: 1,
          color: product.colors[0],
          size: product.sizes[0],
        });
        trackEvent("add_to_cart", product.id, product.category);
        showToast(`Added to cart: ${product.name}`);
      }}
      className={cn(
        "flex w-full items-center justify-center gap-2 bg-navy-900 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-maroon-700 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <ShoppingBag size={14} />
      Quick Add
    </button>
  );
}
