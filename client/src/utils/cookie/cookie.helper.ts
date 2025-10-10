"use server";

import { cookies } from "next/headers";

const TOKEN_KEY = "auth_token";

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAuthToken(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value || "";
}

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
}
