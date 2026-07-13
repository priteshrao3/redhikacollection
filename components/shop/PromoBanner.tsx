import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/content";
import { assignImages } from "@/data/images";

export function PromoBanner({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative mx-auto mt-12 max-w-[1800px] overflow-hidden rounded-2xl px-3 sm:px-4 lg:px-6">
      <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-2xl bg-maroon-900 sm:min-h-[340px]">
        <Image
          src={settings.promoImageUrl || assignImages("Saree", 3, 1)[0]}
          alt="Festive edit — ethnic wear model"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/85 via-maroon-950/30 to-transparent" />
        <div className="relative px-6 py-10 sm:px-14">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">{settings.promoEyebrow}</p>
          <h2 className="mt-3 max-w-md font-display text-3xl leading-tight text-white sm:text-4xl">
            {settings.promoHeading}
          </h2>
          <p className="mt-3 text-2xl font-semibold text-gold-200">{settings.promoOfferText}</p>
          <Button href={settings.promoCtaHref} className="mt-6" size="lg">
            {settings.promoCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
