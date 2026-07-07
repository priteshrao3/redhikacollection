import type { Order } from "@/types/order";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const STATUS_CLASSES: Record<Order["status"], string> = {
  Placed: "bg-info-500/10 text-info-500",
  Confirmed: "bg-gold-500/10 text-gold-600",
  Shipped: "bg-info-500/10 text-info-500",
  "Out for Delivery": "bg-warning-500/10 text-warning-500",
  Delivered: "bg-success-500/10 text-success-500",
};

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left text-xs uppercase tracking-wide text-neutral-400">
            <th className="whitespace-nowrap py-3 pr-4 font-medium">Order ID</th>
            <th className="whitespace-nowrap py-3 pr-4 font-medium">Customer</th>
            <th className="whitespace-nowrap py-3 pr-4 font-medium">Date</th>
            <th className="whitespace-nowrap py-3 pr-4 font-medium">Amount</th>
            <th className="whitespace-nowrap py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-neutral-50 last:border-0">
              <td className="whitespace-nowrap py-3 pr-4 font-medium text-maroon-600">#{order.id}</td>
              <td className="whitespace-nowrap py-3 pr-4 text-navy-800">{order.customerName}</td>
              <td className="whitespace-nowrap py-3 pr-4 text-neutral-500">{order.placedAt}</td>
              <td className="whitespace-nowrap py-3 pr-4 font-medium text-navy-900">{formatPrice(order.total)}</td>
              <td className="whitespace-nowrap py-3">
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", STATUS_CLASSES[order.status])}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
