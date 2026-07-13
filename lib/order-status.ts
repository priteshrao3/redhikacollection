import type { OrderStatus } from "@/types/order";

export const ORDER_STATUS_OPTIONS: OrderStatus[] = ["Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export const ORDER_STATUS_CLASSES: Record<OrderStatus, string> = {
  Placed: "bg-info-500/10 text-info-600",
  Confirmed: "bg-gold-500/15 text-gold-700",
  Shipped: "bg-info-500/10 text-info-600",
  "Out for Delivery": "bg-warning-500/10 text-warning-600",
  Delivered: "bg-success-500/10 text-success-600",
};
