import Image from "next/image";
import { Star } from "lucide-react";
import { heroImageUrl } from "@/data/images";
import { Button } from "@/components/ui/Button";

export function HeroBanner() {
  return (
    <section className="relative flex min-h-140 items-center overflow-hidden bg-navy-900 sm:min-h-160">
      <Image
        src={heroImageUrl()}
        alt="Wedding collection — ethnic wear model"
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/45 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent" />

      {/* Ornamental corner frame */}
      <div className="pointer-events-none absolute inset-5 border border-gold-400/25 sm:inset-8" />
      <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l-2 border-t-2 border-gold-400/70 sm:left-8 sm:top-8" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 border-gold-400/70 sm:bottom-8 sm:right-8" />

      <div className="relative mx-auto w-full max-w-[1800px] px-3 sm:px-4 lg:px-6">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 font-display text-xs uppercase tracking-[0.3em] text-gold-400">
          New Collection
        </span>
        <h1
          className="animate-fade-up mt-5 font-display text-5xl leading-[1.05] text-white sm:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          Wedding Collection
          <br />
          <span className="italic text-gold-300">Elegance in Every Thread</span>
        </h1>
        <p
          className="animate-fade-up mt-5 text-lg font-medium tracking-wide text-gold-200"
          style={{ animationDelay: "0.2s" }}
        >
          Up to 50% Off
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
          <Button href="/category/lehengas" size="lg">
            Shop Now
          </Button>
          <Button href="/category/sarees" variant="outline" size="lg">
            Explore Sarees
          </Button>
        </div>
        <div
          className="animate-fade-up mt-8 flex items-center gap-2 text-sm text-white/70"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="flex items-center gap-1 text-gold-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-gold-300 text-gold-300" />
            ))}
          </span>
          <span>4.9/5 · Loved by 250k+ customers</span>
        </div>
      </div>
    </section>
  );
}
