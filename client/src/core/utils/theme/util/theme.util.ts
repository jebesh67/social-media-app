import { Theme } from "@/core/utils/theme/types/theme.types";

export const ifTheme = (theme: Theme | undefined, trueString: string, falseString: string): string => {
  return theme === "dark" ? trueString : falseString;
};