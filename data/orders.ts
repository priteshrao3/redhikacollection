import type { Order, OrderStatus } from "@/types/order";
import { PRODUCTS } from "@/data/products";

const STATUS_SEQUENCE: OrderStatus[] = [
  "Placed",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function buildTimeline(currentStatus: OrderStatus, placedAt: string) {
  const currentIndex = STATUS_SEQUENCE.indexOf(currentStatus);
  const placedDate = new Date(placedAt);
  return STATUS_SEQUENCE.map((status, i) => {
    const date = new Date(placedDate);
    date.setDate(date.getDate() + i);
    return {
      status,
      date: i <= currentIndex ? date.toISOString().slice(0, 10) : "",
      done: i <= currentIndex,
    };
  });
}

function findProduct(id: string) {
  const p = PRODUCTS.find((prod) => prod.id === id);
  if (!p) throw new Error(`Unknown product id in mock orders: ${id}`);
  return p;
}

interface RawOrder {
  id: string;
  email: string;
  customerName: string;
  placedAt: string;
  status: OrderStatus;
  items: { productId: string; qty: number; color?: string; size?: string }[];
  shipping: number;
  discount: number;
  address: { line1: string; city: string; state: string; pincode: string };
}

const RAW_ORDERS: RawOrder[] = [
  {
    id: "ES10234", email: "pooja.sharma@example.com", customerName: "Pooja Sharma",
    placedAt: "2026-06-24", status: "Delivered",
    items: [{ productId: "lehenga-01", qty: 1, color: "Crimson", size: "M" }],
    shipping: 0, discount: 1000,
    address: { line1: "12 MG Road", city: "Jaipur", state: "Rajasthan", pincode: "302001" },
  },
  {
    id: "ES10235", email: "rahul.verma@example.com", customerName: "Rahul Verma",
    placedAt: "2026-06-27", status: "Shipped",
    items: [{ productId: "suit-08", qty: 1, color: "Copper", size: "L" }],
    shipping: 0, discount: 0,
    address: { line1: "45 Park Street", city: "Kolkata", state: "West Bengal", pincode: "700016" },
  },
  {
    id: "ES10236", email: "neha.singh@example.com", customerName: "Neha Singh",
    placedAt: "2026-06-29", status: "Confirmed",
    items: [
      { productId: "saree-05", qty: 1, color: "Coral", size: "Free Size" },
      { productId: "dress-06", qty: 1, color: "Navy", size: "M" },
    ],
    shipping: 0, discount: 200,
    address: { line1: "7 Residency Road", city: "Bengaluru", state: "Karnataka", pincode: "560025" },
  },
  {
    id: "ES10237", email: "amit.kumar@example.com", customerName: "Amit Kumar",
    placedAt: "2026-06-30", status: "Placed",
    items: [{ productId: "dress-03", qty: 1, color: "Maroon", size: "S" }],
    shipping: 99, discount: 0,
    address: { line1: "22 Civil Lines", city: "Lucknow", state: "Uttar Pradesh", pincode: "226001" },
  },
  {
    id: "ES10238", email: "pooja.sharma@example.com", customerName: "Pooja Sharma",
    placedAt: "2026-06-18", status: "Delivered",
    items: [{ productId: "saree-01", qty: 1, color: "Red", size: "Free Size" }],
    shipping: 0, discount: 500,
    address: { line1: "12 MG Road", city: "Jaipur", state: "Rajasthan", pincode: "302001" },
  },
  {
    id: "ES10239", email: "sana.khan@example.com", customerName: "Sana Khan",
    placedAt: "2026-06-15", status: "Delivered",
    items: [
      { productId: "lehenga-05", qty: 1, color: "Royal Purple", size: "L" },
      { productId: "suit-02", qty: 1, color: "Pastel Pink", size: "M" },
    ],
    shipping: 0, discount: 1500,
    address: { line1: "9 Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: "500034" },
  },
  {
    id: "ES10240", email: "divya.iyer@example.com", customerName: "Divya Iyer",
    placedAt: "2026-07-01", status: "Placed",
    items: [{ productId: "dress-08", qty: 1, color: "Teal", size: "M" }],
    shipping: 99, discount: 0,
    address: { line1: "3 Anna Nagar", city: "Chennai", state: "Tamil Nadu", pincode: "600040" },
  },
  {
    id: "ES10241", email: "ritu.malhotra@example.com", customerName: "Ritu Malhotra",
    placedAt: "2026-06-21", status: "Out for Delivery",
    items: [{ productId: "lehenga-02", qty: 1, color: "Rose Gold", size: "S" }],
    shipping: 0, discount: 800,
    address: { line1: "18 Model Town", city: "Delhi", state: "Delhi", pincode: "110009" },
  },
];

export const MOCK_ORDERS: Order[] = RAW_ORDERS.map((o) => {
  const items = o.items.map((it) => {
    const product = findProduct(it.productId);
    return {
      productId: product.id,
      name: product.name,
      image: product.images[0],
      qty: it.qty,
      price: product.price,
      color: it.color,
      size: it.size,
    };
  });
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const total = subtotal + o.shipping - o.discount;
  return {
    id: o.id,
    email: o.email,
    customerName: o.customerName,
    placedAt: o.placedAt,
    status: o.status,
    items,
    subtotal,
    shipping: o.shipping,
    discount: o.discount,
    total,
    address: o.address,
    timeline: buildTimeline(o.status, o.placedAt),
  };
});

export function findOrder(id: string, email: string): Order | undefined {
  return MOCK_ORDERS.find(
    (o) =>
      o.id.toLowerCase() === id.trim().toLowerCase() &&
      o.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export function getRecentOrders(limit = 8): Order[] {
  return [...MOCK_ORDERS]
    .sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1))
    .slice(0, limit);
}
