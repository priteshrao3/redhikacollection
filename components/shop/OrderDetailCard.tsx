import { OrderTimeline } from "@/components/shop/OrderTimeline";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/types/order";

export function OrderDetailCard({ order }: { order: Order }) {
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto rounded-xl border border-neutral-200 p-6">
        <OrderTimeline steps={order.timeline} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-5">
          <h2 className="mb-3 text-sm font-semibold text-navy-900">Order Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Order ID</dt>
              <dd>{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Order Date</dt>
              <dd>{order.placedAt}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Payment Method</dt>
              <dd>Online Payment</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Total Amount</dt>
              <dd className="font-semibold">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-neutral-200 p-5">
          <h2 className="mb-3 text-sm font-semibold text-navy-900">Shipping Address</h2>
          <p className="text-sm text-neutral-600">
            {order.customerName}
            <br />
            {order.address.line1}
            <br />
            {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 p-5">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">Items</h2>
        <ul className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between py-2.5 text-sm">
              <span className="text-neutral-600">
                {item.name} × {item.qty}
              </span>
              <span className="font-medium text-navy-900">{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
