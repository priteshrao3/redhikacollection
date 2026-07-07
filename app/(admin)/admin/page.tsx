import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { SalesTrendChart } from "@/components/admin/SalesTrendChart";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { MOCK_ORDERS, getRecentOrders } from "@/data/orders";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function AdminDashboardPage() {
  const totalOrders = MOCK_ORDERS.length;
  const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomers = new Set(MOCK_ORDERS.map((o) => o.email)).size;

  return (
    <>
      <AdminTopbar title="Dashboard Overview" subtitle="Welcome back — here's what's happening today." />
      <div className="space-y-6 p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Orders" value={totalOrders.toLocaleString("en-IN")} icon={ShoppingCart} deltaPercent={12.5} accent="maroon" />
          <StatCard label="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} deltaPercent={18.7} accent="success" />
          <StatCard label="Total Customers" value={uniqueCustomers.toLocaleString("en-IN")} icon={Users} deltaPercent={9.3} accent="info" />
          <StatCard label="Total Products" value={PRODUCTS.length.toLocaleString("en-IN")} icon={Package} deltaPercent={7.8} accent="gold" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <ChartCard title="Sales Overview">
            <SalesTrendChart />
          </ChartCard>
          <ChartCard title="Recent Orders">
            <RecentOrdersTable orders={getRecentOrders(5)} />
          </ChartCard>
        </div>
      </div>
    </>
  );
}
