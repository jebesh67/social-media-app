import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { Theme } from "@/core/utils/theme/type/theme.type";
import { ReactElement } from "react";

export const getNavButtonClass = (path: string, pathname: string, theme: Theme): string =>
  pathname === path
    ? ifTheme(theme, "css-dark-nav-button-active", "css-light-nav-button-active")
    : ifTheme(theme, "css-dark-nav-button", "css-light-nav-button");

export const getNavButton = (icon: {
    active: ReactElement;
    inactive: ReactElement
  },
  pathname: string, path: string): ReactElement => {
  return (
    pathname === path
      ? icon.active
      : icon.inactive
  );
};