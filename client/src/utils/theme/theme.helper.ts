import { cookies } from "next/headers";
import { Theme } from "@/stores/theme/types/theme.types";

export const getTheme = async (): Promise<string | undefined> => {
  const cookieTheme: string | undefined = (await cookies()).get("theme")?.value;
  const allowedThemes: string[] = ["light", "dark"];
  
  return allowedThemes.includes(cookieTheme ?? "") ? cookieTheme : "light";
};