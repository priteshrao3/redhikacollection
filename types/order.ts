export type OrderStatus =
  | "Placed"
  | "Confirmed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  color?: string;
  size?: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  date: string;
  done: boolean;
}

export interface Order {
  id: string;
  email: string;
  customerName: string;
  placedAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  address: { line1: string; city: string; state: string; pincode: string };
  timeline: OrderTimelineStep[];
}
