import { ifTheme } from "@/utils/theme/theme.internal";
import { Theme } from "@/utils/theme/types/theme.types";

export const getNavButtonClass = (path: string, pathname: string, theme: Theme): string =>
  pathname === path
    ? ifTheme(theme, "css-dark-nav-button-active", "css-light-nav-button-active")
    : ifTheme(theme, "css-dark-nav-button", "css-light-nav-button");
