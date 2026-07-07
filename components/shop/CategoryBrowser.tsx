"use client";

import { useMemo, useState } from "react";
import type { CategoryName, Product } from "@/types/product";
import { FilterSidebar, type FilterState } from "@/components/shop/FilterSidebar";
import { SortDropdown, type SortOption } from "@/components/shop/SortDropdown";
import { GridListToggle, type ViewMode } from "@/components/shop/GridListToggle";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProductListItem } from "@/components/shop/ProductListItem";

export function CategoryBrowser({
  category,
  products,
}: {
  category: CategoryName;
  products: Product[];
}) {
  const priceCeiling = useMemo(
    () => Math.max(...products.map((p) => p.price), 1000),
    [products]
  );
  const fabricOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.fabric))).sort(),
    [products]
  );
  const colorOptions = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))).slice(0, 10),
    [products]
  );

  const [filters, setFilters] = useState<FilterState>({
    maxPrice: priceCeiling,
    fabrics: [],
    colors: [],
  });
  const [sort, setSort] = useState<SortOption>("popularity");
  const [view, setView] = useState<ViewMode>("grid");

  const visible = useMemo(() => {
    let list = products.filter((p) => p.price <= filters.maxPrice);
    if (filters.fabrics.length) {
      list = list.filter((p) => filters.fabrics.includes(p.fabric));
    }
    if (filters.colors.length) {
      list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    }
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }
  }, [products, filters, sort]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <FilterSidebar
        activeCategory={category}
        priceCeiling={priceCeiling}
        fabricOptions={fabricOptions}
        colorOptions={colorOptions}
        filters={filters}
        onChange={setFilters}
      />

      <div className="flex-1">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-neutral-500">{visible.length} products</p>
          <div className="flex items-center gap-3">
            <SortDropdown value={sort} onChange={setSort} />
            <GridListToggle value={view} onChange={setView} />
          </div>
        </div>

        {view === "grid" ? (
          <ProductGrid products={visible} />
        ) : (
          <div className="flex flex-col gap-3">
            {visible.map((p) => (
              <ProductListItem key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
