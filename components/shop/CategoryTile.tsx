import Image from "next/image";
import Link from "next/link";
import type { CategoryName } from "@/types/product";
import { categoryToSlug } from "@/lib/categories";

export function CategoryTile({ category, image }: { category: CategoryName; image: string }) {
  return (
    <Link href={`/category/${categoryToSlug(category)}`} className="group flex flex-col items-center gap-3">
      <div className="relative h-24 w-24 overflow-hidden rounded-full p-1 ring-1 ring-gold-300 transition-all duration-300 group-hover:ring-2 group-hover:ring-maroon-400 group-hover:shadow-lg sm:h-28 sm:w-28">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={image}
            alt={category}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
      <span className="font-display text-sm font-medium text-navy-800 group-hover:text-maroon-600">
        {category === "Ready-made Dress" ? "Dresses" : `${category}s`}
      </span>
    </Link>
  );
}
