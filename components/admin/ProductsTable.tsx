"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageOff, Pencil, Search, Trash2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice, getStockStatus } from "@/lib/format";
import { cn } from "@/lib/cn";
import { showToast } from "@/components/shop/Toast";
import { Table, TableEmptyState, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { deleteProductAction } from "@/app/(admin)/admin/(dashboard)/products/actions";

const PAGE_SIZE = 10;

const STOCK_LABEL: Record<string, { text: string; className: string }> = {
  "in-stock": { text: "Active", className: "bg-success-500/10 text-success-600" },
  "low-stock": { text: "Low Stock", className: "bg-warning-500/10 text-warning-600" },
  "out-of-stock": { text: "Inactive", className: "bg-danger-500/10 text-danger-600" },
};

export function ProductsTable({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeletingId(product.id);
    const result = await deleteProductAction(product.id);
    setDeletingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast(`Deleted ${product.name}.`);
    router.refresh();
  }

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
        <div className="relative w-full max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search products..."
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/15"
          />
        </div>
        <span className="text-xs font-medium text-neutral-400">{filtered.length} products</span>
      </div>

      <Table>
        <THead>
          <Tr>
            <Th>Product</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </THead>
        <TBody>
          {pageItems.length === 0 && <TableEmptyState colSpan={6} message="No products found." />}
          {pageItems.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            const label = STOCK_LABEL[stockStatus];
            return (
              <Tr key={product.id} className="transition-colors hover:bg-maroon-50/30">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-100 bg-neutral-100">
                      {product.images[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill sizes="40px" className="object-cover" />
                      ) : (
                        <ImageOff size={16} className="text-neutral-300" />
                      )}
                    </div>
                    <span className="max-w-[220px] truncate font-medium text-navy-900">{product.name}</span>
                  </div>
                </Td>
                <Td className="text-neutral-500">{product.category}</Td>
                <Td className="font-medium text-navy-900">{formatPrice(product.price)}</Td>
                <Td className="text-neutral-500">{product.stock}</Td>
                <Td>
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", label.className)}>
                    {label.text}
                  </span>
                </Td>
                <Td>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      aria-label="Edit product"
                      className="text-neutral-400 hover:text-info-500"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      aria-label="Delete product"
                      disabled={deletingId === product.id}
                      onClick={() => handleDelete(product)}
                      className="text-neutral-400 hover:text-danger-500 disabled:opacity-40"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </TBody>
      </Table>

      {filtered.length > 0 && (
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
                  "h-8 w-8 rounded-md text-sm font-medium transition-colors",
                  page === i + 1 ? "bg-maroon-600 text-white shadow-sm" : "text-neutral-500 hover:bg-neutral-100"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
