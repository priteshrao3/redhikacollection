import Link from "next/link";
import { SOCIAL_ICONS, SOCIAL_LABELS } from "@/lib/content-icons";
import type { SiteSettings, SocialLink } from "@/types/content";
import type { CategoryName, CategorySlug } from "@/types/product";

export function Footer({
  settings,
  socialLinks,
  categories,
}: {
  settings: SiteSettings;
  socialLinks: SocialLink[];
  categories: { slug: CategorySlug; name: CategoryName }[];
}) {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-navy-900 text-neutral-300">
      <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-8 px-3 py-12 sm:px-4 md:grid-cols-4 lg:px-6">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-xl font-bold text-white">Shibrah Collection</div>
          <p className="mt-3 text-sm text-neutral-400">{settings.footerTagline}</p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICONS[link.platform];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={SOCIAL_LABELS[link.platform]}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-gold-400 hover:text-gold-400"
                >
                  <Icon width={16} height={16} />
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-white">
                  {c.name === "Ready-made Dress" ? "Ready-made Dresses" : `${c.name}s`}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/track-order" className="hover:text-white">Track Order</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
            <li><span className="cursor-default">Returns &amp; Exchanges</span></li>
            <li><span className="cursor-default">Shipping Info</span></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{settings.contactEmail}</li>
            <li>{settings.contactPhone}</li>
            <li>{settings.businessHours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Shibrah Collection. All rights reserved.
      </div>
    </footer>
  );
}
