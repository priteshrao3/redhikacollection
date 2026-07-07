export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getDiscountPercent(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= 8) return "low-stock";
  return "in-stock";
}

export function formatCompactNumber(n: number): string {
  return new Intl.NumberFormat("en-IN", { notation: "compact" }).format(n);
}
