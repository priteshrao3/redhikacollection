import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { me, type ApiUser } from "@/lib/api/auth";

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";
export const ACCESS_MAX_AGE = 60 * 10; // matches SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // matches SIMPLE_JWT.REFRESH_TOKEN_LIFETIME

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(REFRESH_COOKIE)?.value;
}

/** Reads the session by asking Django who the current access token belongs to. */
export async function getCurrentUser(): Promise<ApiUser | null> {
  const access = await getAccessToken();
  if (!access) return null;
  try {
    return await me(access);
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<ApiUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin(): Promise<ApiUser> {
  const user = await getCurrentUser();
  if (!user || !user.is_staff) redirect("/login");
  return user;
}
