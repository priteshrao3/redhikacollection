import type { Order } from "@/types/order";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ORDER_STATUS_CLASSES } from "@/lib/order-status";

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="py-6 text-center text-sm text-neutral-400">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-neutral-100 text-left text-xs font-semibold uppercase tracking-wide text-neutral-400">
            <th className="whitespace-nowrap py-3 pr-4">Order ID</th>
            <th className="whitespace-nowrap py-3 pr-4">Customer</th>
            <th className="whitespace-nowrap py-3 pr-4">Date</th>
            <th className="whitespace-nowrap py-3 pr-4">Amount</th>
            <th className="whitespace-nowrap py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-neutral-50 last:border-0 hover:bg-maroon-50/30">
              <td className="whitespace-nowrap py-3 pr-4 font-semibold text-maroon-600">#{order.id}</td>
              <td className="whitespace-nowrap py-3 pr-4 text-navy-800">{order.customerName}</td>
              <td className="whitespace-nowrap py-3 pr-4 text-neutral-500">{order.placedAt}</td>
              <td className="whitespace-nowrap py-3 pr-4 font-semibold text-navy-900">{formatPrice(order.total)}</td>
              <td className="whitespace-nowrap py-3">
                <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", ORDER_STATUS_CLASSES[order.status])}>
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
