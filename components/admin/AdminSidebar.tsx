"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LayoutTemplate,
  ListTree,
  LogOut,
  MessageCircle,
  Package,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useAdminSidebar } from "@/components/admin/AdminSidebarContext";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Catalog",
    items: [
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Categories", href: "/admin/categories", icon: ListTree },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Customers", href: "/admin/customers", icon: Users },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Enquiries", href: "/admin/enquiries", icon: MessageCircle },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Content", href: "/admin/content", icon: LayoutTemplate },
      { label: "Analytics", href: "/admin/analytics", icon: TrendingUp },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, setOpen } = useAdminSidebar();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

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
          "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col overflow-y-auto bg-navy-900 px-3 py-6 text-navy-100 transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-6 flex items-center justify-between px-2">
          <span className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-maroon-500 text-navy-900">
              <Sparkles size={16} />
            </span>
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
        <nav className="flex flex-1 flex-col gap-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-400">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active ? "bg-navy-800 text-white" : "text-navy-200/80 hover:bg-navy-800/50 hover:text-white"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-gold-400" />
                      )}
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                          active ? "bg-gold-400/15 text-gold-300" : "text-navy-400 group-hover:text-navy-200"
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-navy-200/80 hover:bg-navy-800/50 hover:text-white"
          >
            <Store size={16} /> View Store
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy-200/80 hover:bg-danger-500/10 hover:text-danger-400"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
