"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { itemCount } = useCart();
  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-navy-900 hover:bg-maroon-50"
    >
      <ShoppingBag size={20} />
      {itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-maroon-600 px-1 text-[10px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
