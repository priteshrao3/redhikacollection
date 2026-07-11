import Link from "next/link";
import type { SVGProps } from "react";
import { CATEGORIES, categoryToSlug } from "@/lib/categories";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M15 4h-2.5A3.5 3.5 0 0 0 9 7.5V10H7v3h2v7h3v-7h2.5l.5-3H12V7.7c0-.7.3-1.2 1.2-1.2H15z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7v4.6l4-2.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-navy-900 text-neutral-300">
      <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-8 px-3 py-12 sm:px-4 md:grid-cols-4 lg:px-6">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-xl font-bold text-white">Shibrah Collection</div>
          <p className="mt-3 text-sm text-neutral-400">
            Premium ethnic wear crafted for every occasion — suits, sarees, lehengas
            and ready-made dresses.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-gold-400 hover:text-gold-400"
              >
                <Icon width={16} height={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link href={`/category/${categoryToSlug(c)}`} className="hover:text-white">
                  {c === "Ready-made Dress" ? "Ready-made Dresses" : `${c}s`}
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
            <li>aleemmalik7786@gmail.com</li>
            <li>+91-6398523316</li>
            <li>Mon-Sat, 10am - 7pm IST</li>
          </ul>
        </div>
      </div>
      {/* <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Shibrah Collection. All rights reserved. (Prototype — demo data only)
      </div> */}
    </footer>
  );
}
