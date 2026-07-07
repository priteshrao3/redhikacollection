"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

export function WishlistButton({ className }: { className?: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        setSaved((v) => !v);
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-sm backdrop-blur transition-all hover:scale-110 hover:text-maroon-600",
        className
      )}
    >
      <Heart size={15} className={saved ? "fill-maroon-600 text-maroon-600" : ""} />
    </button>
  );
}
