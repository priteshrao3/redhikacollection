import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refresh } from "@/lib/api/auth";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, REFRESH_COOKIE } from "@/lib/server/session";

interface AccessPayload {
  exp?: number;
  is_staff?: boolean;
}

function decode(token: string): AccessPayload | null {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isValid(token: string | undefined, requireStaff: boolean): boolean {
  if (!token) return false;
  const payload = decode(token);
  if (!payload || typeof payload.exp !== "number") return false;
  if (payload.exp * 1000 < Date.now() + 5_000) return false;
  if (requireStaff && !payload.is_staff) return false;
  return true;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  const isAccountArea = pathname.startsWith("/account") && pathname !== "/account/register";

  if (!isAdminArea && !isAccountArea) return NextResponse.next();

  const requireStaff = isAdminArea;
  const access = request.cookies.get(ACCESS_COOKIE)?.value;

  if (isValid(access, requireStaff)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (refreshToken) {
    try {
      const { access: newAccess } = await refresh(refreshToken);
      if (isValid(newAccess, requireStaff)) {
        const response = NextResponse.next();
        response.cookies.set(ACCESS_COOKIE, newAccess, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: ACCESS_MAX_AGE,
        });
        return response;
      }
    } catch {
      // refresh token invalid/expired/blacklisted — fall through to redirect
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
