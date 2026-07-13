import type { Order, OrderItem, OrderStatus, OrderTimelineStep } from "@/types/order";
import { apiFetch, type PaginatedResponse } from "@/lib/api/client";

interface ApiOrderItem {
  product_id: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  color: string;
  size: string;
}

export interface ApiOrder {
  order_number: string;
  email: string;
  customer_name: string;
  placed_at: string;
  status: OrderStatus;
  items: ApiOrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  address: { line1: string; city: string; state: string; pincode: string };
  timeline: OrderTimelineStep[];
}

function mapItem(i: ApiOrderItem): OrderItem {
  return {
    productId: i.product_id,
    name: i.name,
    image: i.image,
    qty: i.qty,
    price: i.price,
    color: i.color || undefined,
    size: i.size || undefined,
  };
}

export function mapOrder(o: ApiOrder): Order {
  return {
    id: o.order_number,
    email: o.email,
    customerName: o.customer_name,
    placedAt: o.placed_at,
    status: o.status,
    items: o.items.map(mapItem),
    subtotal: o.subtotal,
    shipping: o.shipping,
    discount: o.discount,
    total: o.total,
    address: o.address,
    timeline: o.timeline,
  };
}

export interface CreateOrderInput {
  email: string;
  customerName: string;
  address: { line1: string; city: string; state: string; pincode: string };
  items: { productId: string; qty: number; color?: string; size?: string }[];
}

export async function createOrder(input: CreateOrderInput, accessToken?: string): Promise<Order> {
  const order = await apiFetch<ApiOrder>("/orders/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({
      email: input.email,
      customer_name: input.customerName,
      address_line1: input.address.line1,
      address_city: input.address.city,
      address_state: input.address.state,
      address_pincode: input.address.pincode,
      items: input.items.map((item) => ({
        product: item.productId,
        qty: item.qty,
        color: item.color ?? "",
        size: item.size ?? "",
      })),
    }),
  });
  return mapOrder(order);
}

export async function trackOrder(orderNumber: string, email: string): Promise<Order | undefined> {
  try {
    const order = await apiFetch<ApiOrder>(
      `/orders/track/?order_number=${encodeURIComponent(orderNumber)}&email=${encodeURIComponent(email)}`
    );
    return mapOrder(order);
  } catch {
    return undefined;
  }
}

export async function myOrders(accessToken: string): Promise<Order[]> {
  const orders = await apiFetch<ApiOrder[]>("/orders/mine/", { authToken: accessToken });
  return orders.map(mapOrder);
}

export async function adminListOrders(accessToken: string): Promise<Order[]> {
  const page = await apiFetch<PaginatedResponse<ApiOrder>>("/orders/?page_size=100", { authToken: accessToken });
  return page.results.map(mapOrder);
}

export async function adminUpdateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  accessToken: string
): Promise<Order> {
  const order = await apiFetch<ApiOrder>(`/orders/${encodeURIComponent(orderNumber)}/status/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({ status }),
  });
  return mapOrder(order);
}
