"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function AccountRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const registerRes = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (!registerRes.ok) {
      setLoading(false);
      const body = await registerRes.json().catch(() => ({}));
      setError(body.error || "Registration failed. Please try again.");
      return;
    }

    const loginRes = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!loginRes.ok) {
      router.push("/login");
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Register" }]} />
      <h1 className="mt-3 font-display text-2xl text-navy-900">Create an Account</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 8 characters)"
          className="rounded-md border border-neutral-300 px-3.5 py-2.5 text-sm outline-none focus:border-maroon-500"
        />
        {error && <p className="text-sm text-danger-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-maroon-600 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "CREATE ACCOUNT"}
        </button>
      </form>

      <p className="mt-4 text-sm text-neutral-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-maroon-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
