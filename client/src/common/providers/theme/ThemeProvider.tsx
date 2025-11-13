"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { Theme } from "@/common/utils/theme/types/theme.types";

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const {theme, setTheme} = useThemeStore();
  
  useEffect((): void => {
    if (initialTheme !== theme) setTheme(initialTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTheme]);
  
  useEffect((): void => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  
  return <>{ children }</>;
}
