import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatPrice } from "@/lib/format";
import { getAccessToken, requireUser } from "@/lib/server/session";
import { myOrders } from "@/lib/api/orders";

export default async function AccountPage() {
  const user = await requireUser();
  const accessToken = await getAccessToken();
  const orders = accessToken ? await myOrders(accessToken) : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />
      <h1 className="mt-3 font-display text-2xl text-navy-900">My Account</h1>

      <div className="mt-6 rounded-xl border border-neutral-200 p-5">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">Profile</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-neutral-500">Name</dt>
            <dd>{user.name || "—"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-200 p-5">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-neutral-500">You haven&apos;t placed any orders yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {orders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <Link href="/track-order" className="font-medium text-maroon-600 hover:underline">
                    {order.id}
                  </Link>
                  <p className="text-neutral-500">
                    {order.placedAt} · {order.status}
                  </p>
                </div>
                <span className="font-semibold text-navy-900">{formatPrice(order.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
