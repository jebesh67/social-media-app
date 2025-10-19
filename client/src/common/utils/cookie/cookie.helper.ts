"use server";

import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const TOKEN_KEY = "auth_token";

export async function setAuthToken(token: string): Promise<void> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAuthToken(): Promise<string> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value || "";
}

export async function clearAuthToken(): Promise<void> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  cookieStore.delete(TOKEN_KEY);
}
