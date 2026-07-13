import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminSidebarProvider } from "@/components/admin/AdminSidebarContext";
import { ToastHost } from "@/components/shop/Toast";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Shibrah Collection Admin" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebarProvider>
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
        <ToastHost />
      </div>
    </AdminSidebarProvider>
  );
}
