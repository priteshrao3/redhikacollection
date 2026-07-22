import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { RepeatableListManager } from "@/components/admin/RepeatableListManager";
import {
  getSiteSettings,
  listContactCards,
  listOccasionTiles,
  listSocialLinks,
  listStats,
  listTrustBadges,
} from "@/lib/api/content";
import {
  createContactCardAction,
  createOccasionTileAction,
  createSocialLinkAction,
  createStatAction,
  createTrustBadgeAction,
  deleteContactCardAction,
  deleteOccasionTileAction,
  deleteSocialLinkAction,
  deleteStatAction,
  deleteTrustBadgeAction,
  updateContactCardAction,
  updateOccasionTileAction,
  updateSocialLinkAction,
  updateStatAction,
  updateTrustBadgeAction,
} from "./actions";
import type { SiteSettings } from "@/types/content";

export const metadata = { title: "Content" };

const CATEGORY_OPTIONS = [
  { value: "Suit", label: "Suit" },
  { value: "Saree", label: "Saree" },
  { value: "Lehenga", label: "Lehenga" },
  { value: "Ready-made Dress", label: "Ready-made Dress" },
];

const TRUST_ICON_OPTIONS = ["truck", "rotate-ccw", "shield-check", "headset", "package", "credit-card"].map((v) => ({
  value: v,
  label: v,
}));

const CONTACT_ICON_OPTIONS = ["message-circle", "calendar-check", "phone", "mail"].map((v) => ({ value: v, label: v }));

const SOCIAL_PLATFORM_OPTIONS = ["instagram", "facebook", "youtube", "twitter", "pinterest"].map((v) => ({
  value: v,
  label: v,
}));

function toRecord<T extends { id: number; sortOrder: number }>(items: T[]): (Record<string, string | number> & { id: number })[] {
  return items.map((item) => {
    const { id, sortOrder, ...rest } = item as unknown as Record<string, unknown> & { id: number; sortOrder: number };
    const record: Record<string, string | number> = { sort_order: sortOrder };
    for (const [key, value] of Object.entries(rest)) {
      const wireKey = key === "ctaLabel" ? "cta_label" : key === "imageUrl" ? "image_url" : key;
      record[wireKey] = value as string | number;
    }
    return { id, ...record };
  });
}

export default async function AdminContentPage() {
  const [settings, occasionTiles, trustBadges, stats, contactCards, socialLinks] = await Promise.all([
    getSiteSettings(),
    listOccasionTiles(),
    listTrustBadges(),
    listStats(),
    listContactCards(),
    listSocialLinks(),
  ]);

  return (
    <>
      <AdminTopbar title="Homepage &amp; Site Content" subtitle="Everything here reflects live on the storefront." />
      <div className="space-y-8 p-6 sm:p-8">
        <SiteSettingsForm initial={settings as SiteSettings} />

        <RepeatableListManager
          title="Occasion Tiles (homepage 'Shop by Occasion')"
          items={toRecord(occasionTiles)}
          fields={[
            { key: "label", label: "Label", type: "text" },
            { key: "category", label: "Category", type: "select", options: CATEGORY_OPTIONS },
            { key: "slug", label: "Category Slug", type: "text", placeholder: "e.g. sarees" },
            { key: "image_url", label: "Image", type: "image" },
          ]}
          onCreate={createOccasionTileAction}
          onUpdate={updateOccasionTileAction}
          onDelete={deleteOccasionTileAction}
        />

        <RepeatableListManager
          title="Trust Badges"
          items={toRecord(trustBadges)}
          fields={[
            { key: "icon", label: "Icon", type: "select", options: TRUST_ICON_OPTIONS },
            { key: "title", label: "Title", type: "text" },
            { key: "subtitle", label: "Subtitle", type: "text" },
          ]}
          onCreate={createTrustBadgeAction}
          onUpdate={updateTrustBadgeAction}
          onDelete={deleteTrustBadgeAction}
        />

        <RepeatableListManager
          title="Stats Strip"
          items={toRecord(stats)}
          fields={[
            { key: "value", label: "Value", type: "text", placeholder: "e.g. 25+" },
            { key: "label", label: "Label", type: "text" },
          ]}
          onCreate={createStatAction}
          onUpdate={updateStatAction}
          onDelete={deleteStatAction}
        />

        <RepeatableListManager
          title="Contact Cards"
          items={toRecord(contactCards)}
          fields={[
            { key: "icon", label: "Icon", type: "select", options: CONTACT_ICON_OPTIONS },
            { key: "title", label: "Title", type: "text" },
            { key: "subtitle", label: "Subtitle", type: "text" },
            { key: "cta_label", label: "CTA Label", type: "text" },
            { key: "href", label: "Href", type: "text" },
          ]}
          onCreate={createContactCardAction}
          onUpdate={updateContactCardAction}
          onDelete={deleteContactCardAction}
        />

        <RepeatableListManager
          title="Social Links"
          items={toRecord(socialLinks)}
          fields={[
            { key: "platform", label: "Platform", type: "select", options: SOCIAL_PLATFORM_OPTIONS },
            { key: "href", label: "URL", type: "url" },
          ]}
          onCreate={createSocialLinkAction}
          onUpdate={updateSocialLinkAction}
          onDelete={deleteSocialLinkAction}
        />
      </div>
    </>
  );
}
