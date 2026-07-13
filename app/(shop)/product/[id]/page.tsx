import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { StarRating } from "@/components/ui/StarRating";
import { ImageGallery } from "@/components/shop/ImageGallery";
import { AddToCartActions } from "@/components/shop/AddToCartActions";
import { WhatsAppEnquireButton } from "@/components/shop/WhatsAppEnquireButton";
import { PincodeChecker } from "@/components/shop/PincodeChecker";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { ProductViewTracker } from "@/components/shop/ProductViewTracker";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Tabs } from "@/components/ui/Tabs";
import { getProductById, getRelatedProducts, listReviews } from "@/lib/api/catalog";
import { categoryToSlug } from "@/lib/categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const [related, reviews] = await Promise.all([
    getRelatedProducts(product),
    listReviews(product.id),
  ]);
  const label = product.category === "Ready-made Dress" ? "Ready-made Dresses" : `${product.category}s`;

  return (
    <div className="mx-auto max-w-[1800px] px-3 py-8 sm:px-4 lg:px-6">
      <ProductViewTracker productId={product.id} category={product.category} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label, href: `/category/${categoryToSlug(product.category)}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-[1.1fr_1fr_0.7fr]">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          <h1 className="font-display text-2xl text-navy-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-2.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
          <div className="mt-4">
            <WhatsAppEnquireButton product={product} size="lg" className="sm:w-auto" />
            <p className="mt-2 text-xs text-neutral-400">Chat with us for price &amp; availability</p>
          </div>

          <hr className="my-6 border-neutral-200" />

          <AddToCartActions product={product} />
        </div>

        <div className="space-y-5 lg:col-span-2 xl:col-span-1">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-navy-900">Product Highlights</h3>
            <ul className="space-y-1.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-neutral-600">
                  <span className="text-maroon-500">›</span> {h}
                </li>
              ))}
            </ul>
          </div>
          <PincodeChecker />
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <Tabs
          tabs={[
            { id: "description", label: "Description", content: <p className="text-sm leading-relaxed text-neutral-600">{product.description}</p> },
            {
              id: "details",
              label: "Details",
              content: (
                <ul className="space-y-1.5 text-sm text-neutral-600">
                  {product.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              ),
            },
            { id: "reviews", label: `Reviews (${product.reviewCount})`, content: <ProductReviews reviews={reviews} /> },
            {
              id: "shipping",
              label: "Shipping",
              content: (
                <p className="text-sm leading-relaxed text-neutral-600">
                  Standard delivery in 4-6 business days. Free shipping on orders above ₹999.
                  15-day easy returns on unused items with original tags.
                </p>
              ),
            },
          ]}
        />
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 font-display text-2xl text-navy-900">You May Also Like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
