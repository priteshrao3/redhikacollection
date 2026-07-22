"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import type { Enquiry } from "@/lib/api/enquiries";
import { cn } from "@/lib/cn";
import { showToast } from "@/components/shop/Toast";
import { Table, TableEmptyState, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { toggleEnquiryContactedAction } from "@/app/(admin)/admin/(dashboard)/enquiries/actions";

export function EnquiriesTable({ enquiries }: { enquiries: Enquiry[] }) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<number | null>(null);

  async function handleToggle(enquiry: Enquiry) {
    setTogglingId(enquiry.id);
    const result = await toggleEnquiryContactedAction(enquiry.id);
    setTogglingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Customer</Th>
          <Th>Phone</Th>
          <Th>Product</Th>
          <Th>Date</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </THead>
      <TBody>
        {enquiries.length === 0 && <TableEmptyState colSpan={6} message="No enquiries yet." />}
        {enquiries.map((enquiry) => (
          <Tr key={enquiry.id} className="transition-colors hover:bg-maroon-50/30">
            <Td className="font-medium text-navy-900">{enquiry.customerName}</Td>
            <Td className="text-neutral-500">{enquiry.phone}</Td>
            <Td className="max-w-[220px] truncate text-neutral-500">{enquiry.productName || "—"}</Td>
            <Td className="whitespace-nowrap text-neutral-500">{enquiry.createdAt.slice(0, 10)}</Td>
            <Td>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold",
                  enquiry.contacted ? "bg-success-500/10 text-success-600" : "bg-warning-500/10 text-warning-600"
                )}
              >
                {enquiry.contacted ? "Contacted" : "New"}
              </span>
            </Td>
            <Td>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="text-success-500 hover:brightness-90"
                >
                  <MessageCircle size={15} />
                </a>
                <button
                  type="button"
                  disabled={togglingId === enquiry.id}
                  onClick={() => handleToggle(enquiry)}
                  className="text-xs font-semibold text-maroon-600 hover:underline disabled:opacity-50"
                >
                  {enquiry.contacted ? "Mark New" : "Mark Contacted"}
                </button>
              </div>
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
