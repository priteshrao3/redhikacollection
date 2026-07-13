import type {
  AnalyticsSummary,
  CategoryClickRow,
  DailyTrendPoint,
  ProductClickRow,
  TrackingEventType,
  TrafficSourceRow,
} from "@/types/analytics";
import type { CategoryName } from "@/types/product";
import { apiFetch } from "@/lib/api/client";
import { getSessionId } from "@/lib/session-id";

/** Public, unauthenticated, fire-and-forget — safe to call directly from client components. */
export function trackEvent(type: TrackingEventType, productId?: string, category?: string): void {
  const sessionId = getSessionId();
  if (!sessionId) return;
  apiFetch("/analytics/events/", {
    method: "POST",
    body: JSON.stringify({
      event_type: type,
      product_id: productId ?? "",
      category: category ?? "",
      session_id: sessionId,
    }),
  }).catch(() => {
    // Best-effort — a dropped analytics event should never surface to the shopper.
  });
}

interface ApiProductClickRow {
  product_id: string;
  name: string;
  category: string;
  price: number;
  clicks: number;
}

interface ApiCategoryClickRow {
  category: string;
  clicks: number;
}

interface ApiDailyTrendPoint {
  date: string;
  visitors: number;
  page_views: number;
}

interface ApiAnalyticsSummary {
  total_clicks: number;
  product_rows: ApiProductClickRow[];
  category_rows: ApiCategoryClickRow[];
  visitors: number;
  page_views: number;
  daily_trend: ApiDailyTrendPoint[];
  traffic_sources: TrafficSourceRow[];
}

/** Server-only, admin-protected. */
export async function adminAnalyticsSummary(accessToken: string): Promise<AnalyticsSummary> {
  const s = await apiFetch<ApiAnalyticsSummary>("/analytics/events/summary/", { authToken: accessToken });

  const productRows: ProductClickRow[] = s.product_rows.map((r) => ({
    productId: r.product_id,
    name: r.name,
    category: r.category as CategoryName,
    price: r.price,
    clicks: r.clicks,
  }));
  const categoryRows: CategoryClickRow[] = s.category_rows.map((r) => ({
    category: r.category as CategoryName,
    clicks: r.clicks,
  }));
  const dailyTrend: DailyTrendPoint[] = s.daily_trend.map((r) => ({
    date: r.date,
    visitors: r.visitors,
    pageViews: r.page_views,
  }));

  return {
    totalClicks: s.total_clicks,
    productRows,
    categoryRows,
    topProduct: productRows[0] ?? null,
    topCategory: categoryRows[0] ?? null,
    visitors: s.visitors,
    pageViews: s.page_views,
    dailyTrend,
    trafficSources: s.traffic_sources,
  };
}
