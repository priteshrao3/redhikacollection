import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/types/content";
import { assignImages } from "@/data/images";

export function BrandStory({ settings }: { settings: SiteSettings }) {
  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src={settings.brandStoryImageUrl || assignImages("Lehenga", 1, 1)[0]}
            alt="Shibrah Collection craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading align="left" size="lg" eyebrow={settings.brandStoryEyebrow} title={settings.brandStoryTitle} />
          <p className="mt-5 text-neutral-600">{settings.brandStoryParagraph1}</p>
          <p className="mt-4 text-neutral-600">{settings.brandStoryParagraph2}</p>
          <Button href={settings.brandStoryCtaHref} variant="ghost" className="mt-7">
            {settings.brandStoryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
