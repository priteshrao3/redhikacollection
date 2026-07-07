import Image from "next/image";
import { assignImages } from "@/data/images";
import { Button } from "@/components/ui/Button";

export function PromoBanner() {
  const [image] = assignImages("Saree", 3, 1);

  return (
    <section className="relative mx-auto mt-12 max-w-[1800px] overflow-hidden rounded-2xl px-3 sm:px-4 lg:px-6">
      <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-2xl bg-maroon-900 sm:min-h-[340px]">
        <Image
          src={image}
          alt="Festive edit — ethnic wear model"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/85 via-maroon-950/30 to-transparent" />
        <div className="relative px-6 py-10 sm:px-14">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-300">
            The Festive Edit
          </p>
          <h2 className="mt-3 max-w-md font-display text-3xl leading-tight text-white sm:text-4xl">
            Bold Colours for the Bold You
          </h2>
          <p className="mt-3 text-2xl font-semibold text-gold-200">Flat 25% Off</p>
          <Button href="/category/suits" className="mt-6" size="lg">
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
