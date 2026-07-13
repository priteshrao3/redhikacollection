"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getAccessToken } from "@/lib/server/session";
import * as content from "@/lib/api/content";
import { ApiError } from "@/lib/api/client";
import type { ContactCard, OccasionTile, SiteSettings, SocialLink, StatItem, TrustBadge } from "@/types/content";

type Result = { ok: true } | { ok: false; error: string };
type Record_ = Record<string, string | number>;

function extractError(err: unknown): string {
  if (err instanceof ApiError) {
    const body = err.body;
    if (body && typeof body === "object") {
      return Object.values(body as Record<string, unknown>).flat().join(" ") || "Request failed.";
    }
  }
  return "Something went wrong. Please try again.";
}

async function run(fn: () => Promise<unknown>): Promise<Result> {
  await requireAdmin();
  try {
    await fn();
    revalidatePath("/admin/content");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: extractError(err) };
  }
}

/** RepeatableListManager sends wire-shaped records (sort_order, cta_label, ...); convert to camelCase. */
function fromRecord<T>(input: Record_): Omit<T, "id"> {
  const { sort_order, cta_label, image_url, id: _id, ...rest } = input;
  const out: Record<string, unknown> = { ...rest, sortOrder: sort_order };
  if (cta_label !== undefined) out.ctaLabel = cta_label;
  if (image_url !== undefined) out.imageUrl = image_url;
  return out as Omit<T, "id">;
}

export async function updateSiteSettingsAction(input: Partial<SiteSettings>): Promise<Result> {
  return run(async () => {
    const accessToken = (await getAccessToken())!;
    await content.adminUpdateSiteSettings(input, accessToken);
  });
}

export async function createOccasionTileAction(input: Record_): Promise<Result> {
  return run(async () => content.createOccasionTile(fromRecord<OccasionTile>(input), (await getAccessToken())!));
}
export async function updateOccasionTileAction(id: number, input: Record_): Promise<Result> {
  return run(async () => content.updateOccasionTile(id, fromRecord<OccasionTile>(input), (await getAccessToken())!));
}
export async function deleteOccasionTileAction(id: number): Promise<Result> {
  return run(async () => content.deleteOccasionTile(id, (await getAccessToken())!));
}

export async function createTrustBadgeAction(input: Record_): Promise<Result> {
  return run(async () => content.createTrustBadge(fromRecord<TrustBadge>(input), (await getAccessToken())!));
}
export async function updateTrustBadgeAction(id: number, input: Record_): Promise<Result> {
  return run(async () => content.updateTrustBadge(id, fromRecord<TrustBadge>(input), (await getAccessToken())!));
}
export async function deleteTrustBadgeAction(id: number): Promise<Result> {
  return run(async () => content.deleteTrustBadge(id, (await getAccessToken())!));
}

export async function createStatAction(input: Record_): Promise<Result> {
  return run(async () => content.createStat(fromRecord<StatItem>(input), (await getAccessToken())!));
}
export async function updateStatAction(id: number, input: Record_): Promise<Result> {
  return run(async () => content.updateStat(id, fromRecord<StatItem>(input), (await getAccessToken())!));
}
export async function deleteStatAction(id: number): Promise<Result> {
  return run(async () => content.deleteStat(id, (await getAccessToken())!));
}

export async function createContactCardAction(input: Record_): Promise<Result> {
  return run(async () => content.createContactCard(fromRecord<ContactCard>(input), (await getAccessToken())!));
}
export async function updateContactCardAction(id: number, input: Record_): Promise<Result> {
  return run(async () => content.updateContactCard(id, fromRecord<ContactCard>(input), (await getAccessToken())!));
}
export async function deleteContactCardAction(id: number): Promise<Result> {
  return run(async () => content.deleteContactCard(id, (await getAccessToken())!));
}

export async function createSocialLinkAction(input: Record_): Promise<Result> {
  return run(async () => content.createSocialLink(fromRecord<SocialLink>(input), (await getAccessToken())!));
}
export async function updateSocialLinkAction(id: number, input: Record_): Promise<Result> {
  return run(async () => content.updateSocialLink(id, fromRecord<SocialLink>(input), (await getAccessToken())!));
}
export async function deleteSocialLinkAction(id: number): Promise<Result> {
  return run(async () => content.deleteSocialLink(id, (await getAccessToken())!));
}
