"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Package, Store, TrendingUp, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useAdminSidebar();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col overflow-y-auto bg-navy-900 px-4 py-6 text-navy-100 transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <span className="font-display text-xl font-bold text-white">
            Shibrah<span className="text-gold-400">Admin</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-navy-100/70 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-navy-800 text-white" : "text-navy-100/70 hover:bg-navy-800/60 hover:text-white"
                )}
              >
                <Icon size={17} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-100/70 hover:bg-navy-800/60 hover:text-white"
          >
            <Store size={17} /> View Store
          </Link>
          <button className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy-100/70 hover:bg-navy-800/60 hover:text-white">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
