import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastHost } from "@/components/shop/Toast";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Radhika Collection Admin" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
      <ToastHost />
    </div>
  );
}
