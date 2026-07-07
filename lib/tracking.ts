import { PRODUCTS } from "@/data/products";
import type {
  AnalyticsSummary,
  CategoryClickRow,
  ProductClickRow,
  TrackingEvent,
  TrackingEventType,
} from "@/types/analytics";
import {
  BASELINE_CATEGORY_CLICKS,
  BASELINE_DAILY_TREND,
  BASELINE_PAGEVIEWS,
  BASELINE_PRODUCT_CLICKS,
  BASELINE_TRAFFIC_SOURCES,
  BASELINE_VISITORS,
} from "@/lib/analytics-baseline";

const STORAGE_KEY = "ethnic_studio_analytics_v1";
const MAX_EVENTS = 500;
export const ANALYTICS_UPDATED_EVENT = "ethnic-studio-analytics-updated";

interface AnalyticsStore {
  events: TrackingEvent[];
  productCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  totalClicks: number;
}

function emptyStore(): AnalyticsStore {
  return { events: [], productCounts: {}, categoryCounts: {}, totalClicks: 0 };
}

function loadStore(): AnalyticsStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyStore(), ...JSON.parse(raw) } : emptyStore();
  } catch {
    return emptyStore();
  }
}

function saveStore(store: AnalyticsStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(ANALYTICS_UPDATED_EVENT));
}

export function trackEvent(
  type: TrackingEventType,
  productId?: string,
  category?: string
): void {
  const store = loadStore();
  if (productId) {
    store.productCounts[productId] = (store.productCounts[productId] || 0) + 1;
  }
  if (category) {
    store.categoryCounts[category] = (store.categoryCounts[category] || 0) + 1;
  }
  store.totalClicks += 1;
  store.events.push({ type, productId, category, ts: Date.now() });
  if (store.events.length > MAX_EVENTS) {
    store.events = store.events.slice(-MAX_EVENTS);
  }
  saveStore(store);
}

export function simulateTraffic(count = 150): void {
  const store = loadStore();
  for (let i = 0; i < count; i++) {
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    store.productCounts[product.id] = (store.productCounts[product.id] || 0) + 1;
    store.categoryCounts[product.category] =
      (store.categoryCounts[product.category] || 0) + 1;
    store.totalClicks += 1;
  }
  saveStore(store);
}

export function resetAnalytics(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(ANALYTICS_UPDATED_EVENT));
}

export function getRawAnalytics(): AnalyticsStore {
  return loadStore();
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const live = loadStore();

  const productRows: ProductClickRow[] = PRODUCTS.map((p) => ({
    productId: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    clicks: (BASELINE_PRODUCT_CLICKS[p.id] ?? 0) + (live.productCounts[p.id] ?? 0),
  })).sort((a, b) => b.clicks - a.clicks);

  const categoryTotals: Record<string, number> = { ...BASELINE_CATEGORY_CLICKS };
  for (const [category, count] of Object.entries(live.categoryCounts)) {
    categoryTotals[category] = (categoryTotals[category] ?? 0) + count;
  }
  const categoryRows: CategoryClickRow[] = Object.entries(categoryTotals)
    .map(([category, clicks]) => ({ category: category as CategoryClickRow["category"], clicks }))
    .sort((a, b) => b.clicks - a.clicks);

  const liveTotal = live.totalClicks;
  const visitors = BASELINE_VISITORS + liveTotal * 3;
  const pageViews = BASELINE_PAGEVIEWS + liveTotal * 5;

  const dailyTrend = BASELINE_DAILY_TREND.map((point, i, arr) =>
    i === arr.length - 1
      ? { ...point, visitors: point.visitors + liveTotal * 3, pageViews: point.pageViews + liveTotal * 5 }
      : point
  );

  return {
    totalClicks:
      Object.values(BASELINE_PRODUCT_CLICKS).reduce((a, b) => a + b, 0) + liveTotal,
    productRows,
    categoryRows,
    topProduct: productRows[0] ?? null,
    topCategory: categoryRows[0] ?? null,
    visitors,
    pageViews,
    dailyTrend,
    trafficSources: BASELINE_TRAFFIC_SOURCES,
  };
}
