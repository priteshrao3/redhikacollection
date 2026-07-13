"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CartLineItem } from "@/components/shop/CartLineItem";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, itemCount } = useCart();
  const router = useRouter();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-3 font-display text-2xl text-navy-900">
        Shopping Cart {items.length > 0 && `(${itemCount} ${itemCount === 1 ? "Item" : "Items"})`}
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 py-12 text-center">
          <ShoppingBag size={48} className="text-neutral-300" />
          <p className="text-neutral-500">Your cart is empty.</p>
          <Link
            href="/"
            className="rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-neutral-200 px-5">
            {items.map((item) => (
              <CartLineItem key={`${item.productId}__${item.color}__${item.size}`} item={item} />
            ))}
            <div className="pb-5">
              <Link href="/" className="text-sm font-medium text-maroon-600 hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>
          <OrderSummary
            subtotal={subtotal}
            itemCount={itemCount}
            onCheckout={() => router.push("/checkout")}
          />
        </div>
      )}
    </div>
  );
}
