"use client";

import { Menu } from "lucide-react";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

export function AdminTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { setOpen } = useAdminSidebar();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-navy-900 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-navy-900">{title}</h1>
          {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-500 sm:block">
          Last 30 Days
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-600 text-sm font-semibold text-white">
          A
        </div>
      </div>
    </div>
  );
}
