import Image from "next/image";
import Link from "next/link";
import { assignImages } from "@/data/images";
import type { CategoryName } from "@/types/product";
import { SectionHeading } from "@/components/ui/SectionHeading";

const OCCASIONS: { label: string; category: CategoryName; slug: string; seed: number }[] = [
  { label: "Party Looks", category: "Ready-made Dress", slug: "dresses", seed: 4 },
  { label: "Haldi & Mehendi", category: "Saree", slug: "sarees", seed: 4 },
  { label: "Wedding Looks", category: "Lehenga", slug: "lehengas", seed: 2 },
  { label: "Festive Looks", category: "Suit", slug: "suits", seed: 4 },
];

export function OccasionGrid() {
  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <SectionHeading eyebrow="Curated For You" title="Shop by Occasion" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {OCCASIONS.map((occasion) => {
          const [image] = assignImages(occasion.category, occasion.seed, 1);
          return (
            <Link
              key={occasion.label}
              href={`/category/${occasion.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100"
            >
              <Image
                src={image}
                alt={occasion.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              <span className="absolute bottom-4 left-0 right-0 text-center font-display text-sm uppercase tracking-[0.2em] text-white">
                {occasion.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
