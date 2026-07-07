import Image from "next/image";
import type { ProductClickRow } from "@/types/analytics";
import { getProductById } from "@/data/products";
import { SEQUENTIAL_BLUE } from "@/lib/chart-theme";

export function TopProductsBar({ rows }: { rows: ProductClickRow[] }) {
  const max = Math.max(1, ...rows.map((r) => r.clicks));

  return (
    <ul className="space-y-4">
      {rows.map((row) => {
        const product = getProductById(row.productId);
        const pct = Math.round((row.clicks / max) * 100);
        return (
          <li key={row.productId} className="flex items-center gap-3">
            {product && (
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                <Image src={product.images[0]} alt={row.name} fill sizes="36px" className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-navy-900">{row.name}</span>
                <span className="shrink-0 text-xs font-semibold text-neutral-500">{row.clicks} clicks</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: SEQUENTIAL_BLUE[450] }}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
