import { NextResponse } from "next/server";
import { register } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  try {
    await register(email, name, password);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ApiError) {
      const body = err.body;
      const detail =
        body && typeof body === "object"
          ? Object.values(body as Record<string, unknown>).flat().join(" ")
          : "";
      return NextResponse.json({ error: detail || "Registration failed." }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
