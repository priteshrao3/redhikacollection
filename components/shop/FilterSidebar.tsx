"use client";

import Link from "next/link";
import { CATEGORIES, categoryToSlug } from "@/lib/categories";
import { guessColorHex } from "@/lib/color-swatch";
import { cn } from "@/lib/cn";
import type { CategoryName } from "@/types/product";

export interface FilterState {
  maxPrice: number;
  fabrics: string[];
  colors: string[];
}

export function FilterSidebar({
  activeCategory,
  priceCeiling,
  fabricOptions,
  colorOptions,
  filters,
  onChange,
}: {
  activeCategory: CategoryName;
  priceCeiling: number;
  fabricOptions: string[];
  colorOptions: string[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  return (
    <aside className="w-full shrink-0 space-y-6 lg:w-56">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-navy-900">Category</h3>
        <ul className="space-y-2">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                href={`/category/${categoryToSlug(c)}`}
                className={cn(
                  "text-sm",
                  c === activeCategory ? "font-semibold text-maroon-600" : "text-neutral-600 hover:text-maroon-600"
                )}
              >
                {c === "Ready-made Dress" ? "Ready-made Dresses" : `${c}s`}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-navy-900">Price</h3>
        <input
          type="range"
          min={500}
          max={priceCeiling}
          step={500}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-maroon-600"
        />
        <div className="mt-1 flex justify-between text-xs text-neutral-500">
          <span>₹500</span>
          <span>Up to ₹{filters.maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {colorOptions.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => {
              const selected = filters.colors.includes(color);
              return (
                <button
                  key={color}
                  type="button"
                  title={color}
                  onClick={() =>
                    onChange({
                      ...filters,
                      colors: selected
                        ? filters.colors.filter((c) => c !== color)
                        : [...filters.colors, color],
                    })
                  }
                  className={cn(
                    "h-6 w-6 rounded-full border-2",
                    selected ? "border-maroon-600" : "border-transparent"
                  )}
                  style={{ backgroundColor: guessColorHex(color) }}
                />
              );
            })}
          </div>
        </div>
      )}

      {fabricOptions.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Fabric</h3>
          <ul className="space-y-2">
            {fabricOptions.map((fabric) => (
              <li key={fabric} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`fabric-${fabric}`}
                  checked={filters.fabrics.includes(fabric)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      fabrics: filters.fabrics.includes(fabric)
                        ? filters.fabrics.filter((f) => f !== fabric)
                        : [...filters.fabrics, fabric],
                    })
                  }
                  className="accent-maroon-600"
                />
                <label htmlFor={`fabric-${fabric}`} className="text-sm text-neutral-600">
                  {fabric}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
