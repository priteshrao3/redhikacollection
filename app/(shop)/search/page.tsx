import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { searchProducts } from "@/lib/api/catalog";

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchProducts(q);

  return (
    <div className="mx-auto max-w-[1800px] px-3 py-8 sm:px-4 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <h1 className="mt-3 font-display text-3xl text-navy-900">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        {q ? `${results.length} products found` : "Type something in the search bar to find products."}
      </p>
      <div className="mt-8">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}
