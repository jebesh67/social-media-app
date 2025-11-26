"use client";

import { useEffect, useLayoutEffect } from "react";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import { Theme } from "@/core/utils/theme/type/theme.type";

const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) => {
  const {theme, setTheme} = useThemeStore();
  
  useLayoutEffect((): void => {
    if (initialTheme !== theme) setTheme(initialTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTheme]);
  
  useEffect((): void => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  
  return <>{ children }</>;
};

export default ThemeProvider;
