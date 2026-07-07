"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice, getStockStatus } from "@/lib/format";
import { cn } from "@/lib/cn";
import { showToast } from "@/components/shop/Toast";

const PAGE_SIZE = 10;

const STOCK_LABEL: Record<string, { text: string; className: string }> = {
  "in-stock": { text: "Active", className: "bg-success-500/10 text-success-500" },
  "low-stock": { text: "Low Stock", className: "bg-warning-500/10 text-warning-500" },
  "out-of-stock": { text: "Inactive", className: "bg-danger-500/10 text-danger-500" },
};

export function ProductsTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          className="w-64 rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-maroon-500"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-400">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const label = STOCK_LABEL[stockStatus];
              return (
                <tr key={product.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        <Image src={product.images[0]} alt={product.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="max-w-[220px] truncate font-medium text-navy-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{product.category}</td>
                  <td className="px-4 py-3 text-navy-900">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-neutral-600">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", label.className)}>
                      {label.text}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        aria-label="Edit product"
                        onClick={() => showToast(`Edit is not available in this prototype (${product.name})`)}
                        className="text-neutral-400 hover:text-info-500"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        aria-label="Delete product"
                        onClick={() => showToast(`Delete is not available in this prototype (${product.name})`)}
                        className="text-neutral-400 hover:text-danger-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
        <span>
          Showing {pageItems.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}-
          {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-8 w-8 rounded-md text-sm font-medium",
                page === i + 1 ? "bg-maroon-600 text-white" : "text-neutral-500 hover:bg-neutral-100"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
