import type {
  ContactCard,
  ContactCardIcon,
  OccasionTile,
  SiteSettings,
  SocialLink,
  SocialPlatform,
  StatItem,
  TrustBadge,
  TrustBadgeIcon,
} from "@/types/content";
import type { CategoryName, CategorySlug } from "@/types/product";
import { apiFetch } from "@/lib/api/client";

interface ApiSiteSettings {
  free_shipping_threshold: number;
  standard_shipping_fee: number;
  discount_threshold: number;
  discount_rate: number;
  payment_methods_text: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  business_hours: string;
  site_title: string;
  site_description: string;
  hero_image_url: string;
  hero_badge_text: string;
  hero_heading_line1: string;
  hero_heading_line2: string;
  hero_subheading: string;
  hero_cta_primary_label: string;
  hero_cta_primary_href: string;
  hero_cta_secondary_label: string;
  hero_cta_secondary_href: string;
  hero_rating_value: number;
  hero_rating_count: string;
  promo_image_url: string;
  promo_eyebrow: string;
  promo_heading: string;
  promo_offer_text: string;
  promo_cta_label: string;
  promo_cta_href: string;
  brand_story_image_url: string;
  brand_story_eyebrow: string;
  brand_story_title: string;
  brand_story_paragraph1: string;
  brand_story_paragraph2: string;
  brand_story_cta_label: string;
  brand_story_cta_href: string;
  footer_tagline: string;
}

function mapSettings(s: ApiSiteSettings): SiteSettings {
  return {
    freeShippingThreshold: s.free_shipping_threshold,
    standardShippingFee: s.standard_shipping_fee,
    discountThreshold: s.discount_threshold,
    discountRate: s.discount_rate,
    paymentMethodsText: s.payment_methods_text,
    contactEmail: s.contact_email,
    contactPhone: s.contact_phone,
    whatsappNumber: s.whatsapp_number,
    businessHours: s.business_hours,
    siteTitle: s.site_title,
    siteDescription: s.site_description,
    heroImageUrl: s.hero_image_url,
    heroBadgeText: s.hero_badge_text,
    heroHeadingLine1: s.hero_heading_line1,
    heroHeadingLine2: s.hero_heading_line2,
    heroSubheading: s.hero_subheading,
    heroCtaPrimaryLabel: s.hero_cta_primary_label,
    heroCtaPrimaryHref: s.hero_cta_primary_href,
    heroCtaSecondaryLabel: s.hero_cta_secondary_label,
    heroCtaSecondaryHref: s.hero_cta_secondary_href,
    heroRatingValue: s.hero_rating_value,
    heroRatingCount: s.hero_rating_count,
    promoImageUrl: s.promo_image_url,
    promoEyebrow: s.promo_eyebrow,
    promoHeading: s.promo_heading,
    promoOfferText: s.promo_offer_text,
    promoCtaLabel: s.promo_cta_label,
    promoCtaHref: s.promo_cta_href,
    brandStoryImageUrl: s.brand_story_image_url,
    brandStoryEyebrow: s.brand_story_eyebrow,
    brandStoryTitle: s.brand_story_title,
    brandStoryParagraph1: s.brand_story_paragraph1,
    brandStoryParagraph2: s.brand_story_paragraph2,
    brandStoryCtaLabel: s.brand_story_cta_label,
    brandStoryCtaHref: s.brand_story_cta_href,
    footerTagline: s.footer_tagline,
  };
}

function toWireSettings(s: Partial<SiteSettings>): Partial<ApiSiteSettings> {
  const wire: Record<string, unknown> = {};
  const map: Record<string, string> = {
    freeShippingThreshold: "free_shipping_threshold",
    standardShippingFee: "standard_shipping_fee",
    discountThreshold: "discount_threshold",
    discountRate: "discount_rate",
    paymentMethodsText: "payment_methods_text",
    contactEmail: "contact_email",
    contactPhone: "contact_phone",
    whatsappNumber: "whatsapp_number",
    businessHours: "business_hours",
    siteTitle: "site_title",
    siteDescription: "site_description",
    heroImageUrl: "hero_image_url",
    heroBadgeText: "hero_badge_text",
    heroHeadingLine1: "hero_heading_line1",
    heroHeadingLine2: "hero_heading_line2",
    heroSubheading: "hero_subheading",
    heroCtaPrimaryLabel: "hero_cta_primary_label",
    heroCtaPrimaryHref: "hero_cta_primary_href",
    heroCtaSecondaryLabel: "hero_cta_secondary_label",
    heroCtaSecondaryHref: "hero_cta_secondary_href",
    heroRatingValue: "hero_rating_value",
    heroRatingCount: "hero_rating_count",
    promoImageUrl: "promo_image_url",
    promoEyebrow: "promo_eyebrow",
    promoHeading: "promo_heading",
    promoOfferText: "promo_offer_text",
    promoCtaLabel: "promo_cta_label",
    promoCtaHref: "promo_cta_href",
    brandStoryImageUrl: "brand_story_image_url",
    brandStoryEyebrow: "brand_story_eyebrow",
    brandStoryTitle: "brand_story_title",
    brandStoryParagraph1: "brand_story_paragraph1",
    brandStoryParagraph2: "brand_story_paragraph2",
    brandStoryCtaLabel: "brand_story_cta_label",
    brandStoryCtaHref: "brand_story_cta_href",
    footerTagline: "footer_tagline",
  };
  for (const [key, value] of Object.entries(s)) {
    if (map[key]) wire[map[key]] = value;
  }
  return wire as Partial<ApiSiteSettings>;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await apiFetch<ApiSiteSettings>("/content/site-settings/");
  return mapSettings(settings);
}

export async function adminUpdateSiteSettings(input: Partial<SiteSettings>, accessToken: string): Promise<SiteSettings> {
  const settings = await apiFetch<ApiSiteSettings>("/content/site-settings/", {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify(toWireSettings(input)),
  });
  return mapSettings(settings);
}

interface ApiOccasionTile {
  id: number;
  label: string;
  category: string;
  slug: string;
  image_url: string;
  sort_order: number;
}

function mapOccasionTile(t: ApiOccasionTile): OccasionTile {
  return {
    id: t.id,
    label: t.label,
    category: t.category as CategoryName,
    slug: t.slug as CategorySlug,
    imageUrl: t.image_url,
    sortOrder: t.sort_order,
  };
}

export async function listOccasionTiles(): Promise<OccasionTile[]> {
  const tiles = await apiFetch<ApiOccasionTile[]>("/content/occasion-tiles/");
  return tiles.map(mapOccasionTile);
}

export async function createOccasionTile(
  input: Omit<OccasionTile, "id">,
  accessToken: string
): Promise<OccasionTile> {
  const tile = await apiFetch<ApiOccasionTile>("/content/occasion-tiles/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({
      label: input.label,
      category: input.category,
      slug: input.slug,
      image_url: input.imageUrl,
      sort_order: input.sortOrder,
    }),
  });
  return mapOccasionTile(tile);
}

export async function updateOccasionTile(
  id: number,
  input: Omit<OccasionTile, "id">,
  accessToken: string
): Promise<OccasionTile> {
  const tile = await apiFetch<ApiOccasionTile>(`/content/occasion-tiles/${id}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({
      label: input.label,
      category: input.category,
      slug: input.slug,
      image_url: input.imageUrl,
      sort_order: input.sortOrder,
    }),
  });
  return mapOccasionTile(tile);
}

export async function deleteOccasionTile(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/content/occasion-tiles/${id}/`, { method: "DELETE", authToken: accessToken });
}

interface ApiTrustBadge {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  sort_order: number;
}

function mapTrustBadge(b: ApiTrustBadge): TrustBadge {
  return { id: b.id, icon: b.icon as TrustBadgeIcon, title: b.title, subtitle: b.subtitle, sortOrder: b.sort_order };
}

export async function listTrustBadges(): Promise<TrustBadge[]> {
  const badges = await apiFetch<ApiTrustBadge[]>("/content/trust-badges/");
  return badges.map(mapTrustBadge);
}

export async function createTrustBadge(input: Omit<TrustBadge, "id">, accessToken: string): Promise<TrustBadge> {
  const badge = await apiFetch<ApiTrustBadge>("/content/trust-badges/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({ icon: input.icon, title: input.title, subtitle: input.subtitle, sort_order: input.sortOrder }),
  });
  return mapTrustBadge(badge);
}

export async function updateTrustBadge(
  id: number,
  input: Omit<TrustBadge, "id">,
  accessToken: string
): Promise<TrustBadge> {
  const badge = await apiFetch<ApiTrustBadge>(`/content/trust-badges/${id}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({ icon: input.icon, title: input.title, subtitle: input.subtitle, sort_order: input.sortOrder }),
  });
  return mapTrustBadge(badge);
}

export async function deleteTrustBadge(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/content/trust-badges/${id}/`, { method: "DELETE", authToken: accessToken });
}

interface ApiStatItem {
  id: number;
  value: string;
  label: string;
  sort_order: number;
}

function mapStatItem(s: ApiStatItem): StatItem {
  return { id: s.id, value: s.value, label: s.label, sortOrder: s.sort_order };
}

export async function listStats(): Promise<StatItem[]> {
  const stats = await apiFetch<ApiStatItem[]>("/content/stats/");
  return stats.map(mapStatItem);
}

export async function createStat(input: Omit<StatItem, "id">, accessToken: string): Promise<StatItem> {
  const stat = await apiFetch<ApiStatItem>("/content/stats/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({ value: input.value, label: input.label, sort_order: input.sortOrder }),
  });
  return mapStatItem(stat);
}

export async function updateStat(id: number, input: Omit<StatItem, "id">, accessToken: string): Promise<StatItem> {
  const stat = await apiFetch<ApiStatItem>(`/content/stats/${id}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({ value: input.value, label: input.label, sort_order: input.sortOrder }),
  });
  return mapStatItem(stat);
}

export async function deleteStat(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/content/stats/${id}/`, { method: "DELETE", authToken: accessToken });
}

interface ApiContactCard {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  cta_label: string;
  href: string;
  sort_order: number;
}

function mapContactCard(c: ApiContactCard): ContactCard {
  return {
    id: c.id,
    icon: c.icon as ContactCardIcon,
    title: c.title,
    subtitle: c.subtitle,
    ctaLabel: c.cta_label,
    href: c.href,
    sortOrder: c.sort_order,
  };
}

export async function listContactCards(): Promise<ContactCard[]> {
  const cards = await apiFetch<ApiContactCard[]>("/content/contact-cards/");
  return cards.map(mapContactCard);
}

export async function createContactCard(input: Omit<ContactCard, "id">, accessToken: string): Promise<ContactCard> {
  const card = await apiFetch<ApiContactCard>("/content/contact-cards/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({
      icon: input.icon,
      title: input.title,
      subtitle: input.subtitle,
      cta_label: input.ctaLabel,
      href: input.href,
      sort_order: input.sortOrder,
    }),
  });
  return mapContactCard(card);
}

export async function updateContactCard(
  id: number,
  input: Omit<ContactCard, "id">,
  accessToken: string
): Promise<ContactCard> {
  const card = await apiFetch<ApiContactCard>(`/content/contact-cards/${id}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({
      icon: input.icon,
      title: input.title,
      subtitle: input.subtitle,
      cta_label: input.ctaLabel,
      href: input.href,
      sort_order: input.sortOrder,
    }),
  });
  return mapContactCard(card);
}

export async function deleteContactCard(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/content/contact-cards/${id}/`, { method: "DELETE", authToken: accessToken });
}

interface ApiSocialLink {
  id: number;
  platform: string;
  href: string;
  sort_order: number;
}

function mapSocialLink(s: ApiSocialLink): SocialLink {
  return { id: s.id, platform: s.platform as SocialPlatform, href: s.href, sortOrder: s.sort_order };
}

export async function listSocialLinks(): Promise<SocialLink[]> {
  const links = await apiFetch<ApiSocialLink[]>("/content/social-links/");
  return links.map(mapSocialLink);
}

export async function createSocialLink(input: Omit<SocialLink, "id">, accessToken: string): Promise<SocialLink> {
  const link = await apiFetch<ApiSocialLink>("/content/social-links/", {
    method: "POST",
    authToken: accessToken,
    body: JSON.stringify({ platform: input.platform, href: input.href, sort_order: input.sortOrder }),
  });
  return mapSocialLink(link);
}

export async function updateSocialLink(
  id: number,
  input: Omit<SocialLink, "id">,
  accessToken: string
): Promise<SocialLink> {
  const link = await apiFetch<ApiSocialLink>(`/content/social-links/${id}/`, {
    method: "PATCH",
    authToken: accessToken,
    body: JSON.stringify({ platform: input.platform, href: input.href, sort_order: input.sortOrder }),
  });
  return mapSocialLink(link);
}

export async function deleteSocialLink(id: number, accessToken: string): Promise<void> {
  await apiFetch<void>(`/content/social-links/${id}/`, { method: "DELETE", authToken: accessToken });
}
