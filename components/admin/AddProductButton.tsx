"use client";

import { Plus } from "lucide-react";
import { showToast } from "@/components/shop/Toast";

export function AddProductButton() {
  return (
    <button
      onClick={() => showToast("Add Product is not available in this prototype yet.")}
      className="flex items-center gap-2 rounded-md bg-maroon-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700"
    >
      <Plus size={16} /> Add New Product
    </button>
  );
}
