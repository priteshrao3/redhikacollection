import { Eye, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { VisitorsTrendChart } from "@/components/admin/VisitorsTrendChart";
import { TopCategoriesDonut } from "@/components/admin/TopCategoriesDonut";
import { TopProductsBar } from "@/components/admin/TopProductsBar";
import { TrafficSourceChart } from "@/components/admin/TrafficSourceChart";
import { adminAnalyticsSummary } from "@/lib/api/analytics";
import { getAccessToken } from "@/lib/server/session";
import { formatCompactNumber } from "@/lib/format";

export const metadata = { title: "Analytics" };

export default async function AdminAnalyticsPage() {
  const accessToken = (await getAccessToken())!;
  const summary = await adminAnalyticsSummary(accessToken);

  return (
    <>
      <AdminTopbar
        title="Analytics &amp; Reports"
        subtitle="Live view of which products &amp; categories customers engage with most."
      />
      <div className="space-y-6 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Visitors" value={formatCompactNumber(summary.visitors)} icon={Users} accent="maroon" />
          <StatCard label="Total Page Views" value={formatCompactNumber(summary.pageViews)} icon={Eye} accent="info" />
          <StatCard label="Total Clicks" value={summary.totalClicks.toLocaleString("en-IN")} icon={MousePointerClick} accent="gold" />
          <StatCard
            label="Top Category"
            value={summary.topCategory ? summary.topCategory.category : "—"}
            icon={TrendingUp}
            accent="success"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Visitors Overview (Last 14 Days)">
            <VisitorsTrendChart data={summary.dailyTrend} />
          </ChartCard>
          <ChartCard title="Top Categories">
            <TopCategoriesDonut rows={summary.categoryRows} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Top Products by Clicks">
            <TopProductsBar rows={summary.productRows.slice(0, 6)} />
          </ChartCard>
          <ChartCard title="Traffic Sources">
            <TrafficSourceChart rows={summary.trafficSources} />
          </ChartCard>
        </div>
      </div>
    </>
  );
}
