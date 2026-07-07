"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-neutral-100 py-5 last:border-0">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-28 sm:w-24">
        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/product/${item.productId}`} className="text-sm font-medium text-navy-900 hover:text-maroon-600">
            {item.name}
          </Link>
          <p className="mt-1 text-xs text-neutral-500">
            {item.color && <>Color: {item.color}</>}
            {item.color && item.size && " · "}
            {item.size && <>Size: {item.size}</>}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <QtyStepper qty={item.qty} onChange={(qty) => updateQty(item, qty)} />
          <button
            type="button"
            onClick={() => removeItem(item)}
            aria-label="Remove item"
            className="text-neutral-400 hover:text-danger-500"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
      <div className="text-right text-sm font-semibold text-navy-900">
        {formatPrice(item.price * item.qty)}
      </div>
    </div>
  );
}
