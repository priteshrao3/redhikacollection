import Link from "next/link";
import {
  DollarSign,
  LayoutTemplate,
  ListTree,
  Package,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { SalesTrendChart } from "@/components/admin/SalesTrendChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { adminListOrders } from "@/lib/api/orders";
import { getProductCount } from "@/lib/api/catalog";
import { getAccessToken } from "@/lib/server/session";
import { formatPrice } from "@/lib/format";

const QUICK_LINKS = [
  { label: "Categories", href: "/admin/categories", icon: ListTree },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Homepage Content", href: "/admin/content", icon: LayoutTemplate },
];

function buildSalesTrend(orders: { placedAt: string; total: number }[]) {
  const byDate = new Map<string, number>();
  for (const order of orders) {
    byDate.set(order.placedAt, (byDate.get(order.placedAt) ?? 0) + order.total);
  }
  return [...byDate.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, revenue]) => ({ date, revenue }));
}

export default async function AdminDashboardPage() {
  const accessToken = (await getAccessToken())!;
  const [orders, productCount] = await Promise.all([adminListOrders(accessToken), getProductCount()]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomers = new Set(orders.map((o) => o.email)).size;
  const recentOrders = [...orders].sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1)).slice(0, 5);
  const salesTrend = buildSalesTrend(orders);

  return (
    <>
      <AdminTopbar title="Dashboard Overview" subtitle="Welcome back — here's what's happening today." />
      <div className="space-y-6 p-6 sm:p-8">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-navy-900 via-navy-900 to-maroon-900 p-6 text-white shadow-sm sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/10 blur-2xl" />
          <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-maroon-400/20 blur-2xl" />
          <p className="relative section-eyebrow text-gold-300">Shibrah Collection</p>
          <h2 className="relative mt-2 font-display text-2xl font-bold sm:text-3xl">
            Everything you need to run the store, in one place.
          </h2>
          <p className="relative mt-2 max-w-xl text-sm text-navy-100/80">
            Manage products, orders, customers, and homepage content — changes go live on the storefront instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Orders" value={totalOrders.toLocaleString("en-IN")} icon={ShoppingCart} accent="maroon" />
          <StatCard label="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} accent="success" />
          <StatCard label="Total Customers" value={uniqueCustomers.toLocaleString("en-IN")} icon={Users} accent="info" />
          <StatCard label="Total Products" value={productCount.toLocaleString("en-IN")} icon={Package} accent="gold" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Sales Overview">
            <SalesTrendChart data={salesTrend} />
          </ChartCard>
          <ChartCard title="Recent Orders">
            <RecentOrdersTable orders={recentOrders} />
          </ChartCard>
        </div>

        <div>
          <h2 className="mb-3 font-display text-sm font-semibold text-navy-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-maroon-200 hover:shadow-md"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-maroon-50 text-maroon-600 transition-colors group-hover:bg-maroon-600 group-hover:text-white">
                  <link.icon size={17} />
                </span>
                <span className="text-sm font-semibold text-navy-900">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
