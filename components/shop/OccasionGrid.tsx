import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { OccasionTile } from "@/types/content";

export function OccasionGrid({ tiles }: { tiles: OccasionTile[] }) {
  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <SectionHeading eyebrow="Curated For You" title="Shop by Occasion" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={`/category/${tile.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100"
          >
            <Image
              src={tile.imageUrl}
              alt={tile.label}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
            <span className="absolute bottom-4 left-0 right-0 text-center font-display text-sm uppercase tracking-[0.2em] text-white">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
