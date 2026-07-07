"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { ColorSizeSelector } from "@/components/shop/ColorSizeSelector";
import { QtyStepper } from "@/components/ui/QtyStepper";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/tracking";
import { showToast } from "@/components/shop/Toast";

export function AddToCartActions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();
  const outOfStock = product.stock <= 0;

  function buildCartItem() {
    return {
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      qty,
      color,
      size,
    };
  }

  function handleAddToCart() {
    addItem(buildCartItem());
    trackEvent("add_to_cart", product.id, product.category);
    showToast(`Added to cart: ${product.name}`);
  }

  function handleBuyNow() {
    addItem(buildCartItem());
    trackEvent("buy_now", product.id, product.category);
    router.push("/cart");
  }

  return (
    <div className="space-y-5">
      <ColorSizeSelector
        colors={product.colors}
        sizes={product.sizes}
        selectedColor={color}
        selectedSize={size}
        onColorChange={setColor}
        onSizeChange={setSize}
      />

      <div>
        <span className="mb-2 block text-sm text-neutral-500">Quantity</span>
        <QtyStepper qty={qty} onChange={setQty} max={Math.min(10, product.stock || 10)} />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={outOfStock}
          onClick={handleAddToCart}
          className="flex-1 rounded-md border-2 border-maroon-600 px-6 py-3 text-sm font-semibold text-maroon-600 transition-colors hover:bg-maroon-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ADD TO CART
        </button>
        <button
          type="button"
          disabled={outOfStock}
          onClick={handleBuyNow}
          className="flex-1 rounded-md bg-maroon-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          BUY NOW
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-300 text-neutral-500 hover:border-maroon-400 hover:text-maroon-600"
        >
          <Heart size={18} />
        </button>
      </div>
      {outOfStock && <p className="text-sm text-danger-500">This item is currently out of stock.</p>}
    </div>
  );
}
