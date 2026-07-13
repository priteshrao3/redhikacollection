import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { heroImageUrl } from "@/data/images";

export function HeroBanner({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative flex min-h-140 items-center overflow-hidden bg-navy-900 sm:min-h-160">
      <Image
        src={settings.heroImageUrl || heroImageUrl()}
        alt="Wedding collection — ethnic wear model"
        fill
        priority
        sizes="100vw"
        className="animate-kenburns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1800px] px-3 sm:px-4 lg:px-6">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 font-display text-xs uppercase tracking-[0.3em] text-gold-400">
          {settings.heroBadgeText}
        </span>
        <h1
          className="animate-fade-up mt-5 font-display text-5xl leading-[1.05] text-white sm:text-6xl"
          style={{ animationDelay: "0.1s" }}
        >
          {settings.heroHeadingLine1}
          <br />
          <span className="italic text-gold-300">{settings.heroHeadingLine2}</span>
        </h1>
        <p
          className="animate-fade-up mt-5 text-lg font-medium tracking-wide text-gold-200"
          style={{ animationDelay: "0.2s" }}
        >
          {settings.heroSubheading}
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-4" style={{ animationDelay: "0.3s" }}>
          <Button href={settings.heroCtaPrimaryHref} size="lg">
            {settings.heroCtaPrimaryLabel}
          </Button>
          <Button href={settings.heroCtaSecondaryHref} variant="outline" size="lg">
            {settings.heroCtaSecondaryLabel}
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
          <span>
            {settings.heroRatingValue}/5 · Loved by {settings.heroRatingCount} customers
          </span>
        </div>
      </div>
    </section>
  );
}
