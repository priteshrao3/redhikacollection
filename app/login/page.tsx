"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setError(body.error || "Login failed. Please try again.");
      return;
    }

    // Honor ?next= (set by proxy.ts when redirecting here from a guarded
    // page) unless it would send a non-staff user into /admin — in that
    // case fall back to their role's home instead of bouncing them
    // straight back to the login page.
    const next = searchParams.get("next");
    const fallback = body.isStaff ? "/admin" : "/account";
    const target = next && (body.isStaff || !next.startsWith("/admin")) ? next : fallback;

    router.push(target);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl font-bold text-maroon-700">Shibrah</span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.35em] text-gold-600">COLLECTION</span>
        </Link>
        <h1 className="mt-4 font-display text-xl text-navy-900">Login</h1>
        <p className="mt-1 text-sm text-neutral-500">Sign in to your account.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
          />
          {error && <p className="text-sm text-danger-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-maroon-600 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "LOGIN"}
          </button>
        </form>

        <p className="mt-4 text-sm text-neutral-500">
          New here?{" "}
          <Link href="/account/register" className="font-medium text-maroon-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
