import { TRUST_BADGE_ICONS } from "@/lib/content-icons";
import type { TrustBadge } from "@/types/content";

export function TrustBadgeStrip({ badges }: { badges: TrustBadge[] }) {
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
