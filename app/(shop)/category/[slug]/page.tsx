import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryBrowser } from "@/components/shop/CategoryBrowser";
import { getProductsByCategory } from "@/data/products";
import { CATEGORY_SLUGS, slugToCategory } from "@/lib/categories";
import type { CategorySlug } from "@/types/product";

export function generateStaticParams() {
  return Object.values(CATEGORY_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory(slug);
  if (!category) return {};
  return {
    title: category === "Ready-made Dress" ? "Ready-made Dresses" : `${category}s`,
    description: `Shop premium ${category.toLowerCase()}s at Radhika Collection — fast shipping, easy returns.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = slugToCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug as CategorySlug);
  const label = category === "Ready-made Dress" ? "Ready-made Dresses" : `${category}s`;

  return (
    <div className="mx-auto max-w-[1800px] px-3 py-8 sm:px-4 lg:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label }]} />
      <h1 className="mt-3 font-display text-3xl text-navy-900">{label}</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Explore our wide range of {category.toLowerCase()}s for every occasion.
      </p>
      <div className="mt-8">
        <CategoryBrowser category={category} products={products} />
      </div>
    </div>
  );
}
