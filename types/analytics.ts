import type { CategoryName } from "./product";

export type TrackingEventType =
  | "price_click"
  | "add_to_cart"
  | "buy_now"
  | "product_view";

export interface TrackingEvent {
  type: TrackingEventType;
  productId?: string;
  category?: string;
  ts: number;
}

export interface ProductClickRow {
  productId: string;
  name: string;
  category: CategoryName;
  price: number;
  clicks: number;
}

export interface CategoryClickRow {
  category: CategoryName;
  clicks: number;
}

export interface DailyTrendPoint {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface TrafficSourceRow {
  source: string;
  percent: number;
}

export interface AnalyticsSummary {
  totalClicks: number;
  productRows: ProductClickRow[];
  categoryRows: CategoryClickRow[];
  topProduct: ProductClickRow | null;
  topCategory: CategoryClickRow | null;
  visitors: number;
  pageViews: number;
  dailyTrend: DailyTrendPoint[];
  trafficSources: TrafficSourceRow[];
}
