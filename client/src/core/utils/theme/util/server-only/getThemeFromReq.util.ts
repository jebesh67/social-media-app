import { NextRequest } from "next/server";
import { Theme } from "@/core/utils/theme/types/theme.types";

export const getThemeFromReq = (req: NextRequest): Theme => {
  const cookieValue: string | undefined = req.cookies.get("theme")?.value;
  
  if (cookieValue === "light" || cookieValue === "dark") {
    return cookieValue;
  }
  return "light";
};
