import { HeroBanner } from "@/components/shop/HeroBanner";
import { TrustBadgeStrip } from "@/components/shop/TrustBadgeStrip";
import { CategoryTile } from "@/components/shop/CategoryTile";
import { ProductRail } from "@/components/shop/ProductRail";
import { OccasionGrid } from "@/components/shop/OccasionGrid";
import { PromoBanner } from "@/components/shop/PromoBanner";
import { StatsStrip } from "@/components/shop/StatsStrip";
import { BrandStory } from "@/components/shop/BrandStory";
import { ContactCTA } from "@/components/shop/ContactCTA";
import { Testimonials } from "@/components/shop/Testimonials";
import { Reveal } from "@/components/shop/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBestSellers, getLatestProducts, getProductsByCategory } from "@/data/products";
import { CATEGORIES, categoryToSlug } from "@/lib/categories";

export default function HomePage() {
  const latest = getLatestProducts(8);
  const bestSellers = getBestSellers(8);
  const sarees = getProductsByCategory("sarees").slice(0, 8);

  return (
    <>
      <HeroBanner />
      <TrustBadgeStrip />

      <Reveal>
        <ProductRail
          title="Latest Collection"
          subtitle="Fresh styles just landed — be the first to shop them"
          products={latest}
          viewAllHref="/category/dresses"
        />
      </Reveal>

      <Reveal>
        <OccasionGrid />
      </Reveal>

      <Reveal>
        <ProductRail
          title="Best Sellers"
          subtitle="Our most-loved pieces, handpicked by fellow shoppers"
          products={bestSellers}
          viewAllHref="/category/lehengas"
        />
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
          <SectionHeading eyebrow="Handpicked For You" title="Shop by Category" />
          <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
            {CATEGORIES.map((category) => {
              const [first] = getProductsByCategory(categoryToSlug(category));
              return <CategoryTile key={category} category={category} image={first?.images[0] ?? ""} />;
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ProductRail
          title="Sarees"
          subtitle="Discover the tradition with comfort of a saree"
          products={sarees}
          viewAllHref="/category/sarees"
        />
      </Reveal>

      <Reveal>
        <PromoBanner />
      </Reveal>
      <Reveal>
        <BrandStory />
      </Reveal>
      <StatsStrip />
      <Reveal>
        <ContactCTA />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
    </>
  );
}
