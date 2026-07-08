"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AdminSidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextValue | null>(null);

export function AdminSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <AdminSidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const ctx = useContext(AdminSidebarContext);
  if (!ctx) throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  return ctx;
}
