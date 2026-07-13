"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Order, OrderStatus } from "@/types/order";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ORDER_STATUS_CLASSES, ORDER_STATUS_OPTIONS } from "@/lib/order-status";
import { showToast } from "@/components/shop/Toast";
import { Table, TableEmptyState, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { updateOrderStatusAction } from "@/app/(admin)/admin/(dashboard)/orders/actions";

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function handleStatusChange(order: Order, status: OrderStatus) {
    setUpdatingId(order.id);
    const result = await updateOrderStatusAction(order.id, status);
    setUpdatingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <Table className="min-w-[640px]">
      <THead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
        </Tr>
      </THead>
      <TBody>
        {orders.length === 0 && <TableEmptyState colSpan={5} message="No orders yet." />}
        {orders.map((order) => (
          <Tr key={order.id} className="transition-colors hover:bg-maroon-50/30">
            <Td className="whitespace-nowrap font-semibold text-maroon-600">#{order.id}</Td>
            <Td className="whitespace-nowrap">
              <span className="font-medium text-navy-800">{order.customerName}</span>
              <div className="text-xs text-neutral-400">{order.email}</div>
            </Td>
            <Td className="whitespace-nowrap text-neutral-500">{order.placedAt}</Td>
            <Td className="whitespace-nowrap font-semibold text-navy-900">{formatPrice(order.total)}</Td>
            <Td className="whitespace-nowrap">
              <select
                value={order.status}
                disabled={updatingId === order.id}
                onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                className={cn(
                  "cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none disabled:opacity-50",
                  ORDER_STATUS_CLASSES[order.status]
                )}
              >
                {ORDER_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
