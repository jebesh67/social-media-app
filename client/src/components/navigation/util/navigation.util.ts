import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { Theme } from "@/common/utils/theme/types/theme.types";
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