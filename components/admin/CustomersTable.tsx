"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Customer } from "@/lib/api/customers";
import { cn } from "@/lib/cn";
import { showToast } from "@/components/shop/Toast";
import { Table, TableEmptyState, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { toggleCustomerActiveAction } from "@/app/(admin)/admin/(dashboard)/customers/actions";

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<number | null>(null);

  async function handleToggle(customer: Customer) {
    const verb = customer.isActive ? "deactivate" : "reactivate";
    if (!confirm(`Are you sure you want to ${verb} ${customer.email}?`)) return;
    setTogglingId(customer.id);
    const result = await toggleCustomerActiveAction(customer.id);
    setTogglingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast(`${customer.email} ${result.customer.isActive ? "reactivated" : "deactivated"}.`);
    router.refresh();
  }

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Joined</Th>
          <Th>Orders</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </THead>
      <TBody>
        {customers.length === 0 && <TableEmptyState colSpan={6} message="No customers yet." />}
        {customers.map((customer) => (
          <Tr key={customer.id} className="transition-colors hover:bg-maroon-50/30">
            <Td>
              <Link href={`/admin/customers/${customer.id}`} className="font-medium text-maroon-600 hover:underline">
                {customer.name || "—"}
              </Link>
              {customer.isStaff && (
                <span className="ml-2 rounded-full bg-info-500/10 px-2 py-0.5 text-[10px] font-semibold text-info-600">
                  STAFF
                </span>
              )}
            </Td>
            <Td className="text-neutral-500">{customer.email}</Td>
            <Td className="text-neutral-500">{customer.dateJoined.slice(0, 10)}</Td>
            <Td className="text-neutral-500">{customer.orderCount}</Td>
            <Td>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  customer.isActive ? "bg-success-500/10 text-success-600" : "bg-danger-500/10 text-danger-600"
                )}
              >
                {customer.isActive ? "Active" : "Disabled"}
              </span>
            </Td>
            <Td>
              <button
                type="button"
                disabled={togglingId === customer.id}
                onClick={() => handleToggle(customer)}
                className="text-xs font-semibold text-maroon-600 hover:underline disabled:opacity-50"
              >
                {customer.isActive ? "Deactivate" : "Reactivate"}
              </button>
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
