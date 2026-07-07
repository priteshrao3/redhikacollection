"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Package, Store, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-navy-900 px-4 py-6 text-navy-100">
      <div className="mb-8 px-2 font-display text-xl font-bold text-white">
        Radhika<span className="text-gold-400">Admin</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
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
  );
}
