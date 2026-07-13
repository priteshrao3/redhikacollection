import { apiFetch } from "@/lib/api/client";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ApiUser {
  id: number;
  email: string;
  name: string;
  is_staff: boolean;
}

/** Server-only: called from Route Handlers / Server Actions / proxy.ts, never from client components. */

export async function register(email: string, name: string, password: string): Promise<void> {
  await apiFetch<{ email: string; name: string }>("/auth/register/", {
    method: "POST",
    body: JSON.stringify({ email, name, password }),
  });
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function refresh(refreshToken: string): Promise<{ access: string }> {
  return apiFetch<{ access: string }>("/auth/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export async function logout(refreshToken: string): Promise<void> {
  await apiFetch<void>("/auth/logout/", {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export async function me(accessToken: string): Promise<ApiUser> {
  return apiFetch<ApiUser>("/auth/me/", { authToken: accessToken });
}
