"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { CartBadge } from "@/components/shop/CartBadge";
import { CATEGORIES } from "@/lib/categories";
import { categoryToSlug } from "@/lib/categories";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  ...CATEGORIES.map((c) => ({ label: c === "Ready-made Dress" ? "Ready-made Dresses" : `${c}s`, href: `/category/${categoryToSlug(c)}` })),
];

const OFFERS = [
  "Free Shipping on Orders Above ₹6999",
  "Flat 25% Off on Wedding Collection",
  "Easy 7-Day Returns | COD Not Available",
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="overflow-hidden border-b border-maroon-900/20 bg-maroon-700 py-1.5 text-xs font-medium tracking-wide text-white">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {[...OFFERS, ...OFFERS].map((offer, i) => (
            <span key={i}>{offer}</span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1800px] items-center gap-4 px-3 py-3 sm:px-4 lg:px-6">
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span className="font-display text-2xl font-bold text-maroon-700">Shibrah</span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.35em] text-gold-600">
            COLLECTION
          </span>
        </Link>

        <nav className="hidden gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-800 hover:text-maroon-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <form
            onSubmit={handleSearch}
            className="hidden items-center rounded-full border border-neutral-300 px-3 py-1.5 sm:flex"
          >
            <button type="submit" aria-label="Search" className="text-neutral-400 hover:text-maroon-600">
              <Search size={16} />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories..."
              className="ml-2 w-48 bg-transparent text-sm outline-none placeholder:text-neutral-400 lg:w-64"
            />
          </form>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy-900 hover:bg-maroon-50 sm:flex"
          >
            <Heart size={20} />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-navy-900 hover:bg-maroon-50 sm:flex"
          >
            <User size={20} />
          </button>
          <CartBadge />
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-navy-800 hover:bg-maroon-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
