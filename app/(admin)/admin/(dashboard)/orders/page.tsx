import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { adminListOrders } from "@/lib/api/orders";
import { getAccessToken } from "@/lib/server/session";

export const metadata = { title: "Orders" };

export default async function AdminOrdersPage() {
  const accessToken = (await getAccessToken())!;
  const orders = await adminListOrders(accessToken);

  return (
    <>
      <AdminTopbar title="Orders" subtitle={`${orders.length} orders`} />
      <div className="p-6 sm:p-8">
        <OrdersTable orders={orders} />
      </div>
    </>
  );
}
