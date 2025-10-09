"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme/themeStore";
import { Theme } from "@/utils/theme/types/theme.types";

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme | undefined;
}) {
  const {theme, setTheme} = useThemeStore();
  
  useEffect((): void => {
    if (initialTheme !== theme) {
      setTheme(initialTheme || "light");
    }
  }, [initialTheme]);
  
  useEffect((): void => {
    const body: HTMLElement = document.body;
    
    body.classList.remove(theme === "dark" ? "css-theme-light" : "css-theme-dark");
    body.classList.add(theme === "dark" ? "css-theme-dark" : "css-theme-light");
  }, [theme]);
  
  return <>{ children }</>;
}
