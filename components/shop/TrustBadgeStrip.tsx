import { TRUST_BADGE_ICONS } from "@/lib/content-icons";
import type { TrustBadge } from "@/types/content";

<<<<<<< HEAD
const BADGES = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹6999" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "7 days return policy" },
  { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% secure payment" },
  { icon: Headset, title: "24/7 Support", subtitle: "We are here to help" },
];

export function TrustBadgeStrip() {
=======
export function TrustBadgeStrip({ badges }: { badges: TrustBadge[] }) {
>>>>>>> e847f0d (app updated)
  return (
    <div className="grid grid-cols-2 gap-4 border-y border-neutral-200 bg-maroon-50/40 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
      {badges.map((badge) => {
        const Icon = TRUST_BADGE_ICONS[badge.icon];
        return (
          <div key={badge.id} className="group flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-maroon-600 shadow-sm ring-1 ring-gold-100 transition-transform duration-300 group-hover:scale-110 group-hover:text-maroon-700">
              <Icon size={19} />
            </span>
            <div>
              <div className="text-sm font-semibold text-navy-900">{badge.title}</div>
              <div className="text-xs text-neutral-500">{badge.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
