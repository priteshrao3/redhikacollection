import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { CustomersTable } from "@/components/admin/CustomersTable";
import { adminListCustomers } from "@/lib/api/customers";
import { getAccessToken } from "@/lib/server/session";

export const metadata = { title: "Customers" };

export default async function AdminCustomersPage() {
  const accessToken = (await getAccessToken())!;
  const customers = await adminListCustomers(accessToken);

  return (
    <>
      <AdminTopbar title="Customers" subtitle={`${customers.length} accounts`} />
      <div className="p-6 sm:p-8">
        <CustomersTable customers={customers} />
      </div>
    </>
  );
}
