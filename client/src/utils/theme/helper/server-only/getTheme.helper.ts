"use server";

import { cookies } from "next/headers";
import { Theme } from "@/utils/theme/types/theme.types";

export const getTheme = async (): Promise<Theme | undefined> => {
  const cookieTheme = (await cookies()).get("theme")?.value as Theme | undefined;
  const allowedThemes = new Set<Theme>(["light", "dark"]);
  return allowedThemes.has(cookieTheme ?? "light") ? (cookieTheme as Theme) : "light";
};

