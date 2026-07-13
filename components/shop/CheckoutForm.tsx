"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { OrderSummary } from "@/components/shop/OrderSummary";
import { OrderDetailCard } from "@/components/shop/OrderDetailCard";
import { submitOrder } from "@/app/(shop)/checkout/actions";
import type { Order } from "@/types/order";

export function CheckoutForm({ initialName, initialEmail }: { initialName: string; initialEmail: string }) {
  const { items, subtotal, itemCount, clear } = useCart();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await submitOrder({
      email,
      customerName: name,
      address: { line1, city, state, pincode },
      items: items.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        color: item.color,
        size: item.size,
      })),
    });
    setLoading(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    clear();
    setConfirmedOrder(result.order);
  }

  if (confirmedOrder) {
    return (
      <div className="mt-6">
        <div className="mb-6 rounded-lg border border-success-500/20 bg-success-500/5 p-5 text-sm text-success-600">
          Order placed successfully! Your order ID is <strong>{confirmedOrder.id}</strong>.
        </div>
        <OrderDetailCard order={confirmedOrder} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-4 py-12 text-center">
        <p className="text-neutral-500">Your cart is empty.</p>
        <Link href="/" className="rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-neutral-200 p-5">
        <h2 className="mb-1 text-sm font-semibold text-navy-900">Shipping Details</h2>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <input
          type="text"
          required
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          placeholder="Address"
          className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
          <input
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
        </div>
        <input
          type="text"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Pincode"
          className="w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        {error && <p className="text-sm text-danger-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-maroon-600 py-3 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "PLACE ORDER"}
        </button>
      </form>
      <OrderSummary subtotal={subtotal} itemCount={itemCount} showCheckoutButton={false} />
    </div>
  );
}
