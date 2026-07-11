import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const BADGES = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders above ₹6999" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "7 days return policy" },
  { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% secure payment" },
  { icon: Headset, title: "24/7 Support", subtitle: "We are here to help" },
];

export function TrustBadgeStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 border-y border-neutral-200 bg-maroon-50/40 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
      {BADGES.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="group flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-maroon-600 shadow-sm ring-1 ring-gold-100 transition-transform duration-300 group-hover:scale-110 group-hover:text-maroon-700">
            <Icon size={19} />
          </span>
          <div>
            <div className="text-sm font-semibold text-navy-900">{title}</div>
            <div className="text-xs text-neutral-500">{subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
