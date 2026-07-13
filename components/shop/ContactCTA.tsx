import Link from "next/link";
import { CONTACT_CARD_ICONS } from "@/lib/content-icons";
import type { ContactCard } from "@/types/content";

export function ContactCTA({ cards }: { cards: ContactCard[] }) {
  return (
    <section className="border-y border-neutral-200 bg-maroon-50/40">
      <div className="mx-auto grid max-w-[1800px] gap-6 px-3 py-14 sm:grid-cols-2 sm:px-4 lg:px-6">
        {cards.map((card) => {
          const Icon = CONTACT_CARD_ICONS[card.icon];
          return (
            <div
              key={card.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gold-200 bg-white px-6 py-10 text-center shadow-sm"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                <Icon size={26} />
              </span>
              <h3 className="font-display text-xl text-navy-900">{card.title}</h3>
              <p className="text-sm text-neutral-500">{card.subtitle}</p>
              <Link
                href={card.href}
                className="mt-2 inline-flex items-center justify-center rounded-md border border-maroon-600 px-6 py-2.5 text-sm font-semibold text-maroon-600 transition-colors hover:bg-maroon-600 hover:text-white"
              >
                {card.ctaLabel}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
