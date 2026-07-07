import Image from "next/image";
import { assignImages } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BrandStory() {
  const [image] = assignImages("Lehenga", 1, 1);

  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/10] lg:aspect-[4/5]">
          <Image
            src={image}
            alt="Shibrah Collection craftsmanship"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeading
            align="left"
            size="lg"
            eyebrow="Our Story"
            title={
              <>
                Woven with Heritage,
                <br />
                Styled for Today
              </>
            }
          />
          <p className="mt-5 text-neutral-600">
            Shibrah Collection began with a simple idea — every woman deserves ethnic wear
            that feels as good as it looks. From hand-picked Banarasi weaves to
            contemporary Indo-western silhouettes, each piece in our collection is chosen
            for its craftsmanship, fabric quality, and finish.
          </p>
          <p className="mt-4 text-neutral-600">
            We work directly with weaving clusters and skilled artisans across India,
            bringing their work to your wardrobe without the markup of a traditional
            boutique — so timeless design stays within reach.
          </p>
          <Button href="/category/sarees" variant="ghost" className="mt-7">
            Discover the Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
