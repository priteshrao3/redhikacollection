"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/types/content";
import { Input, Textarea } from "@/components/ui/Field";
import { Tabs } from "@/components/ui/Tabs";
import { SingleImageUpload } from "@/components/admin/SingleImageUpload";
import { updateSiteSettingsAction } from "@/app/(admin)/admin/(dashboard)/content/actions";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-navy-900">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function SiteSettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [s, setS] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof SiteSettings>(key: K, value: string) {
    const isNumber = typeof s[key] === "number";
    setS((prev) => ({ ...prev, [key]: isNumber ? Number(value) : value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    const result = await updateSiteSettingsAction(s);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <Tabs
        tabs={[
          {
            id: "commerce",
            label: "Commerce & Contact",
            content: (
              <div className="space-y-4">
                <Section title="Commerce">
                  <Input label="Free Shipping Threshold (₹)" type="number" value={s.freeShippingThreshold} onChange={(e) => set("freeShippingThreshold", e.target.value)} />
                  <Input label="Standard Shipping Fee (₹)" type="number" value={s.standardShippingFee} onChange={(e) => set("standardShippingFee", e.target.value)} />
                  <Input label="Discount Threshold (₹)" type="number" value={s.discountThreshold} onChange={(e) => set("discountThreshold", e.target.value)} />
                  <Input label="Discount Rate (0-1)" type="number" value={s.discountRate} onChange={(e) => set("discountRate", e.target.value)} />
                  <Input label="Payment Methods Text" value={s.paymentMethodsText} onChange={(e) => set("paymentMethodsText", e.target.value)} />
                </Section>
                <Section title="Contact">
                  <Input label="Contact Email" value={s.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
                  <Input label="Contact Phone (display)" value={s.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
                  <Input label="WhatsApp Number (digits only, with country code)" value={s.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} />
                  <Input label="Business Hours" value={s.businessHours} onChange={(e) => set("businessHours", e.target.value)} />
                </Section>
                <Section title="Site Meta">
                  <Input label="Site Title" value={s.siteTitle} onChange={(e) => set("siteTitle", e.target.value)} />
                  <Input label="Site Description" value={s.siteDescription} onChange={(e) => set("siteDescription", e.target.value)} />
                </Section>
              </div>
            ),
          },
          {
            id: "hero",
            label: "Hero Banner",
            content: (
              <Section title="Hero Banner">
                <SingleImageUpload label="Image" value={s.heroImageUrl} onChange={(url) => set("heroImageUrl", url)} />
                <Input label="Badge Text" value={s.heroBadgeText} onChange={(e) => set("heroBadgeText", e.target.value)} />
                <Input label="Heading Line 1" value={s.heroHeadingLine1} onChange={(e) => set("heroHeadingLine1", e.target.value)} />
                <Input label="Heading Line 2" value={s.heroHeadingLine2} onChange={(e) => set("heroHeadingLine2", e.target.value)} />
                <Input label="Subheading" value={s.heroSubheading} onChange={(e) => set("heroSubheading", e.target.value)} />
                <Input label="Primary CTA Label" value={s.heroCtaPrimaryLabel} onChange={(e) => set("heroCtaPrimaryLabel", e.target.value)} />
                <Input label="Primary CTA Href" value={s.heroCtaPrimaryHref} onChange={(e) => set("heroCtaPrimaryHref", e.target.value)} />
                <Input label="Secondary CTA Label" value={s.heroCtaSecondaryLabel} onChange={(e) => set("heroCtaSecondaryLabel", e.target.value)} />
                <Input label="Secondary CTA Href" value={s.heroCtaSecondaryHref} onChange={(e) => set("heroCtaSecondaryHref", e.target.value)} />
                <Input label="Rating Value" type="number" value={s.heroRatingValue} onChange={(e) => set("heroRatingValue", e.target.value)} />
                <Input label="Rating Count Text" value={s.heroRatingCount} onChange={(e) => set("heroRatingCount", e.target.value)} />
              </Section>
            ),
          },
          {
            id: "promo-brand",
            label: "Promo & Brand Story",
            content: (
              <div className="space-y-4">
                <Section title="Promo Banner">
                  <SingleImageUpload label="Image" value={s.promoImageUrl} onChange={(url) => set("promoImageUrl", url)} />
                  <Input label="Eyebrow" value={s.promoEyebrow} onChange={(e) => set("promoEyebrow", e.target.value)} />
                  <Input label="Heading" value={s.promoHeading} onChange={(e) => set("promoHeading", e.target.value)} />
                  <Input label="Offer Text" value={s.promoOfferText} onChange={(e) => set("promoOfferText", e.target.value)} />
                  <Input label="CTA Label" value={s.promoCtaLabel} onChange={(e) => set("promoCtaLabel", e.target.value)} />
                  <Input label="CTA Href" value={s.promoCtaHref} onChange={(e) => set("promoCtaHref", e.target.value)} />
                </Section>
                <Section title="Brand Story">
                  <SingleImageUpload label="Image" value={s.brandStoryImageUrl} onChange={(url) => set("brandStoryImageUrl", url)} />
                  <Input label="Eyebrow" value={s.brandStoryEyebrow} onChange={(e) => set("brandStoryEyebrow", e.target.value)} />
                  <Input label="Title" value={s.brandStoryTitle} onChange={(e) => set("brandStoryTitle", e.target.value)} />
                  <Input label="CTA Label" value={s.brandStoryCtaLabel} onChange={(e) => set("brandStoryCtaLabel", e.target.value)} />
                  <Input label="CTA Href" value={s.brandStoryCtaHref} onChange={(e) => set("brandStoryCtaHref", e.target.value)} />
                  <div className="sm:col-span-2">
                    <Textarea label="Paragraph 1" rows={3} value={s.brandStoryParagraph1} onChange={(e) => set("brandStoryParagraph1", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Textarea label="Paragraph 2" rows={3} value={s.brandStoryParagraph2} onChange={(e) => set("brandStoryParagraph2", e.target.value)} />
                  </div>
                </Section>
              </div>
            ),
          },
          {
            id: "footer",
            label: "Footer",
            content: (
              <Section title="Footer">
                <div className="sm:col-span-2">
                  <Input label="Tagline" value={s.footerTagline} onChange={(e) => set("footerTagline", e.target.value)} />
                </div>
              </Section>
            ),
          },
        ]}
      />

      {error && <p className="mt-2 text-sm text-danger-500">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="btn-shine relative mt-4 overflow-hidden rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-maroon-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "SAVE SETTINGS"}
      </button>
    </form>
  );
}
