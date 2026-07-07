"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { OrderTimeline } from "@/components/shop/OrderTimeline";
import { formatPrice } from "@/lib/format";
import { findOrder } from "@/data/orders";
import type { Order } from "@/types/order";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOrder(findOrder(orderId, email) ?? null);
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
          className="rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700"
        >
          TRACK ORDER
        </button>
      </form>

      <p className="mt-2 text-xs text-neutral-400">
        Try order <code className="rounded bg-neutral-100 px-1 py-0.5">ES10236</code> with{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5">neha.singh@example.com</code>
      </p>

      {order === null && (
        <div className="mt-10 rounded-lg border border-danger-500/20 bg-danger-500/5 p-5 text-sm text-danger-500">
          No order found for that order ID and email combination. Please check and try again.
        </div>
      )}

      {order && (
        <div className="mt-10 space-y-8">
          <div className="overflow-x-auto rounded-xl border border-neutral-200 p-6">
            <OrderTimeline steps={order.timeline} />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-5">
              <h2 className="mb-3 text-sm font-semibold text-navy-900">Order Details</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-neutral-500">Order ID</dt><dd>{order.id}</dd></div>
                <div className="flex justify-between"><dt className="text-neutral-500">Order Date</dt><dd>{order.placedAt}</dd></div>
                <div className="flex justify-between"><dt className="text-neutral-500">Payment Method</dt><dd>Online Payment</dd></div>
                <div className="flex justify-between"><dt className="text-neutral-500">Total Amount</dt><dd className="font-semibold">{formatPrice(order.total)}</dd></div>
              </dl>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <h2 className="mb-3 text-sm font-semibold text-navy-900">Shipping Address</h2>
              <p className="text-sm text-neutral-600">
                {order.customerName}<br />
                {order.address.line1}<br />
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-5">
            <h2 className="mb-3 text-sm font-semibold text-navy-900">Items</h2>
            <ul className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <li key={item.productId} className="flex justify-between py-2.5 text-sm">
                  <span className="text-neutral-600">{item.name} × {item.qty}</span>
                  <span className="font-medium text-navy-900">{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
