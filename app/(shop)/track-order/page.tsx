"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { OrderDetailCard } from "@/components/shop/OrderDetailCard";
import { trackOrder } from "@/lib/api/orders";
import type { Order } from "@/types/order";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const found = await trackOrder(orderId, email);
    setLoading(false);
    setOrder(found ?? null);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Track Order" }]} />
      <h1 className="mt-3 font-display text-2xl text-navy-900">Track Your Order</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Enter your order ID and email to track your order.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Order ID (e.g. ES10234)"
          className="flex-1 rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="flex-1 rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "TRACK ORDER"}
        </button>
      </form>

      {order === null && (
        <div className="mt-10 rounded-lg border border-danger-500/20 bg-danger-500/5 p-5 text-sm text-danger-500">
          No order found for that order ID and email combination. Please check and try again.
        </div>
      )}

      {order && <div className="mt-10"><OrderDetailCard order={order} /></div>}
    </div>
  );
}
