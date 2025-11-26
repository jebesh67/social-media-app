import { Theme } from "@/core/utils/theme/type/theme.type";

export const ifTheme = (theme: Theme | undefined, trueString: string, falseString: string): string => {
  return theme === "dark" ? trueString : falseString;
};