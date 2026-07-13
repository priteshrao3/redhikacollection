import { notFound } from "next/navigation";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ChartCard } from "@/components/ui/ChartCard";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ORDER_STATUS_CLASSES } from "@/lib/order-status";
import { adminGetCustomer } from "@/lib/api/customers";
import { getAccessToken } from "@/lib/server/session";

export const metadata = { title: "Customer Detail" };

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const accessToken = (await getAccessToken())!;
  const customer = await adminGetCustomer(Number(id), accessToken).catch(() => null);
  if (!customer) notFound();

  return (
    <>
      <AdminTopbar title={customer.name || customer.email} subtitle={customer.email} />
      <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.6fr]">
        <ChartCard title="Profile">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-maroon-500 to-maroon-700 text-lg font-semibold text-white">
              {(customer.name || customer.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-navy-900">{customer.name || "—"}</p>
              <span
                className={cn(
                  "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  customer.isActive ? "bg-success-500/10 text-success-600" : "bg-danger-500/10 text-danger-600"
                )}
              >
                {customer.isActive ? "Active" : "Disabled"}
              </span>
            </div>
          </div>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between border-t border-neutral-100 pt-2.5">
              <dt className="text-neutral-500">Email</dt>
              <dd className="font-medium text-navy-800">{customer.email}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-2.5">
              <dt className="text-neutral-500">Joined</dt>
              <dd className="font-medium text-navy-800">{customer.dateJoined.slice(0, 10)}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-2.5">
              <dt className="text-neutral-500">Total Orders</dt>
              <dd className="font-medium text-navy-800">{customer.orderCount}</dd>
            </div>
          </dl>
        </ChartCard>

        <ChartCard title={`Order History (${customer.orders.length})`}>
          {customer.orders.length === 0 ? (
            <p className="py-6 text-center text-sm text-neutral-400">No orders placed yet.</p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {customer.orders.map((order) => (
                <li key={order.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <span className="font-semibold text-maroon-600">#{order.id}</span>
                    <p className="mt-0.5 text-neutral-500">{order.placedAt}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", ORDER_STATUS_CLASSES[order.status])}>
                      {order.status}
                    </span>
                    <span className="w-20 text-right font-semibold text-navy-900">{formatPrice(order.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ChartCard>
      </div>
    </>
  );
}
