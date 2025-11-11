import { create } from "zustand";
import { setCookie } from "cookies-next";
import { ThemeState, Theme } from "@/common/utils/theme/types/theme.types";

export const useThemeStore = create<ThemeState>((set, get): ThemeState => ({
  theme: "light",
  
  setTheme: (newTheme: Theme): void => {
    set({theme: newTheme});
    setCookie("theme", newTheme, {maxAge: 60 * 60 * 24 * 30});
  },
  
  nextTheme: (): void => {
    const current: Theme = get().theme;
    const next: Theme = current === "dark" ? "light" : "dark";
    
    set({theme: next});
    setCookie("theme", next, {maxAge: 60 * 60 * 24 * 30});
  },
}));
