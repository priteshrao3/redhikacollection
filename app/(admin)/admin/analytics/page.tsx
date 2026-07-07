"use client";

import { Eye, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { VisitorsTrendChart } from "@/components/admin/VisitorsTrendChart";
import { TopCategoriesDonut } from "@/components/admin/TopCategoriesDonut";
import { TopProductsBar } from "@/components/admin/TopProductsBar";
import { TrafficSourceChart } from "@/components/admin/TrafficSourceChart";
import { SimulateTrafficControls } from "@/components/admin/SimulateTrafficControls";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatCompactNumber } from "@/lib/format";

export default function AdminAnalyticsPage() {
  const { summary, simulate, reset } = useAnalytics();

  return (
    <>
      <AdminTopbar
        title="Analytics &amp; Reports"
        subtitle="Live view of which products &amp; categories customers engage with most."
      />
      <div className="space-y-6 p-6 sm:p-8">
        <div className="flex justify-end">
          <SimulateTrafficControls onSimulate={() => simulate(80)} onReset={reset} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Visitors" value={summary ? formatCompactNumber(summary.visitors) : "—"} icon={Users} accent="maroon" />
          <StatCard label="Total Page Views" value={summary ? formatCompactNumber(summary.pageViews) : "—"} icon={Eye} accent="info" />
          <StatCard label="Total Price Clicks" value={summary ? summary.totalClicks.toLocaleString("en-IN") : "—"} icon={MousePointerClick} accent="gold" />
          <StatCard
            label="Top Category"
            value={summary?.topCategory ? `${summary.topCategory.category}` : "—"}
            icon={TrendingUp}
            accent="success"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Visitors Overview (Last 14 Days)">
            {summary && <VisitorsTrendChart data={summary.dailyTrend} />}
          </ChartCard>
          <ChartCard title="Top Categories">
            {summary && <TopCategoriesDonut rows={summary.categoryRows} />}
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Top Products by Clicks">
            {summary && <TopProductsBar rows={summary.productRows.slice(0, 6)} />}
          </ChartCard>
          <ChartCard title="Traffic Sources">
            {summary && <TrafficSourceChart rows={summary.trafficSources} />}
          </ChartCard>
        </div>
      </div>
    </>
  );
}
