"use server";

import { cookies } from "next/headers";
import { Theme } from "@/common/utils/theme/types/theme.types";

export const getTheme = async (): Promise<Theme> => {
  const cookieTheme = (await cookies()).get("theme")?.value as Theme | undefined;
  
  return cookieTheme === "dark" ? "dark" : "light";
};
