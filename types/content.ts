import type { CategoryName, CategorySlug } from "@/types/product";

export interface SiteSettings {
  freeShippingThreshold: number;
  standardShippingFee: number;
  discountThreshold: number;
  discountRate: number;
  paymentMethodsText: string;

  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  businessHours: string;

  siteTitle: string;
  siteDescription: string;

  heroImageUrl: string;
  heroBadgeText: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubheading: string;
  heroCtaPrimaryLabel: string;
  heroCtaPrimaryHref: string;
  heroCtaSecondaryLabel: string;
  heroCtaSecondaryHref: string;
  heroRatingValue: number;
  heroRatingCount: string;

  promoImageUrl: string;
  promoEyebrow: string;
  promoHeading: string;
  promoOfferText: string;
  promoCtaLabel: string;
  promoCtaHref: string;

  brandStoryImageUrl: string;
  brandStoryEyebrow: string;
  brandStoryTitle: string;
  brandStoryParagraph1: string;
  brandStoryParagraph2: string;
  brandStoryCtaLabel: string;
  brandStoryCtaHref: string;

  footerTagline: string;
}

export type TrustBadgeIcon = "truck" | "rotate-ccw" | "shield-check" | "headset" | "package" | "credit-card";
export type ContactCardIcon = "message-circle" | "calendar-check" | "phone" | "mail";
export type SocialPlatform = "instagram" | "facebook" | "youtube" | "twitter" | "pinterest";

export interface OccasionTile {
  id: number;
  label: string;
  category: CategoryName;
  slug: CategorySlug;
  imageUrl: string;
  sortOrder: number;
}

export interface TrustBadge {
  id: number;
  icon: TrustBadgeIcon;
  title: string;
  subtitle: string;
  sortOrder: number;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
  sortOrder: number;
}

export interface ContactCard {
  id: number;
  icon: ContactCardIcon;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href: string;
  sortOrder: number;
}

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  href: string;
  sortOrder: number;
}
