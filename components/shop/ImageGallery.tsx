"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-2.5 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={img + i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-14 shrink-0 overflow-hidden rounded-md border-2 sm:h-20 sm:w-16",
              active === i ? "border-maroon-600" : "border-neutral-200"
            )}
          >
            <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
