"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme/themeStore";

export default function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: string | undefined;
}) {
  const {theme, setTheme} = useThemeStore();
  
  useEffect(() => {
    if (initialTheme && initialTheme !== theme) {
      setTheme(initialTheme as typeof theme);
    }
  }, [initialTheme]);
  
  useEffect((): void => {
    const body: HTMLElement = document.body;
    
    body.classList.remove(theme === "dark" ? "css-theme-light" : "css-theme-dark");
    
    body.classList.add(theme === "dark" ? "css-theme-dark" : "css-theme-light");
  }, [theme]);
  
  return <>{ children }</>;
}
