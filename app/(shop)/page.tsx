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
import { getBestSellers, getLatestProducts, getProductsByCategory, listCategories } from "@/lib/api/catalog";
import { getSiteSettings, listContactCards, listOccasionTiles, listStats, listTrustBadges } from "@/lib/api/content";
import { heroImageUrl } from "@/data/images";

export default async function HomePage() {
  const [latest, bestSellers, sareesFull, categories, settings, occasionTiles, trustBadges, stats, contactCards] =
    await Promise.all([
      getLatestProducts(8),
      getBestSellers(8),
      getProductsByCategory("sarees"),
      listCategories(),
      getSiteSettings(),
      listOccasionTiles(),
      listTrustBadges(),
      listStats(),
      listContactCards(),
    ]);
  const sarees = sareesFull.slice(0, 8);
  const categoryTileProducts = await Promise.all(categories.map((c) => getProductsByCategory(c.slug)));

  return (
    <>
      <HeroBanner settings={settings} />
      <TrustBadgeStrip badges={trustBadges} />

      <Reveal>
        <ProductRail
          title="Latest Collection"
          subtitle="Fresh styles just landed — be the first to shop them"
          products={latest}
          viewAllHref="/category/dresses"
        />
      </Reveal>

      <Reveal>
        <OccasionGrid tiles={occasionTiles} />
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
            {categories.map((category, i) => {
              const [first] = categoryTileProducts[i];
              const image = first?.images[0] ?? heroImageUrl(400);
              return <CategoryTile key={category.slug} category={category.name} image={image} />;
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
        <PromoBanner settings={settings} />
      </Reveal>
      <Reveal>
        <BrandStory settings={settings} />
      </Reveal>
      <StatsStrip stats={stats} />
      <Reveal>
        <ContactCTA cards={contactCards} />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
    </>
  );
}
