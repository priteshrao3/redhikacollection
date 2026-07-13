import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { logout } from "@/lib/api/auth";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/server/session";

export async function POST() {
  const store = await cookies();
  const refreshToken = store.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    await logout(refreshToken).catch(() => {
      // Already-expired/blacklisted refresh tokens shouldn't block logout.
    });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
