import { NextResponse } from "next/server";
import { login, me } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, REFRESH_COOKIE, REFRESH_MAX_AGE } from "@/lib/server/session";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const tokens = await login(email, password);
    const user = await me(tokens.access);
    const response = NextResponse.json({ ok: true, isStaff: user.is_staff });
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set(ACCESS_COOKIE, tokens.access, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });
    response.cookies.set(REFRESH_COOKIE, tokens.refresh, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });
    return response;
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
