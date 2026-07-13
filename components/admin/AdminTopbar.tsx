"use client";

import { CalendarDays, Menu } from "lucide-react";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

export function AdminTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { setOpen } = useAdminSidebar();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-8">
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
          <h1 className="font-display text-xl font-bold text-navy-900">{title}</h1>
          {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-500 sm:flex">
          <CalendarDays size={13} /> Last 30 Days
        </div>
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-maroon-500 to-maroon-700 text-xs font-semibold text-white">
            A
          </div>
          <span className="hidden text-xs font-semibold text-navy-800 sm:inline">Admin</span>
        </div>
      </div>
    </div>
  );
}
