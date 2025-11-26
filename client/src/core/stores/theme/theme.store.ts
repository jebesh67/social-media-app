import { create } from "zustand";
import { setCookie } from "cookies-next";
import { IThemeState, Theme } from "@/core/utils/theme/type/theme.type";

export const useThemeStore = create<IThemeState>((set, get): IThemeState => ({
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
