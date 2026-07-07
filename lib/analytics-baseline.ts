import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/lib/categories";
import type { DailyTrendPoint, TrafficSourceRow } from "@/types/analytics";

// Deterministic seeded PRNG so baseline numbers don't reshuffle on every
// reload/build -- that would look broken rather than "realistic".
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260702);

export const BASELINE_VISITORS = 24583;
export const BASELINE_PAGEVIEWS = 78354;

export const BASELINE_DAILY_TREND: DailyTrendPoint[] = Array.from({ length: 14 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  const growth = 1 + i * 0.035;
  const visitors = Math.round((1200 + rand() * 500) * growth);
  const pageViews = Math.round(visitors * (2.6 + rand() * 0.8));
  return { date: date.toISOString().slice(0, 10), visitors, pageViews };
});

export const BASELINE_PRODUCT_CLICKS: Record<string, number> = Object.fromEntries(
  PRODUCTS.map((p) => {
    const weight = p.isBestSeller ? 180 : 40;
    return [p.id, Math.round(weight + rand() * weight)];
  })
);

export const BASELINE_CATEGORY_CLICKS: Record<string, number> = Object.fromEntries(
  CATEGORIES.map((c) => [
    c,
    PRODUCTS.filter((p) => p.category === c).reduce(
      (sum, p) => sum + (BASELINE_PRODUCT_CLICKS[p.id] ?? 0),
      0
    ),
  ])
);

// Derived proxy revenue trend (pageViews * an avg-order-value-ish factor) so
// the dashboard's "Sales Overview" chart has a plausible 14-day shape without
// needing a much larger synthetic order dataset.
export const BASELINE_REVENUE_TREND: { date: string; revenue: number }[] = BASELINE_DAILY_TREND.map(
  (point) => ({ date: point.date, revenue: Math.round(point.pageViews * 0.58 * 100) })
);

export const BASELINE_TRAFFIC_SOURCES: TrafficSourceRow[] = [
  { source: "Direct", percent: 40 },
  { source: "Organic Search", percent: 30 },
  { source: "Social Media", percent: 20 },
  { source: "Referral", percent: 10 },
];
