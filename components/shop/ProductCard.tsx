import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PriceTag } from "@/components/ui/PriceTag";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { QuickAddButton } from "@/components/shop/QuickAddButton";
import { getStockStatus } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const stockStatus = getStockStatus(product.stock);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-maroon-100 hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge variant="maroon" className="absolute left-2 top-2">
          {product.category}
        </Badge>
        {product.discountPercent > 0 && (
          <Badge variant="gold" className="absolute right-2 top-2">
            {product.discountPercent}% OFF
          </Badge>
        )}
        <WishlistButton className="absolute bottom-13 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        {stockStatus !== "in-stock" && (
          <span className="absolute bottom-13 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-danger-500">
            {stockStatus === "out-of-stock" ? "Out of Stock" : "Only a few left"}
          </span>
        )}
        {stockStatus !== "out-of-stock" && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <QuickAddButton product={product} />
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="line-clamp-2 text-sm font-medium text-navy-900 group-hover:text-maroon-600">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-2">
          <PriceTag
            price={product.price}
            mrp={product.mrp}
            discountPercent={product.discountPercent}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
}
