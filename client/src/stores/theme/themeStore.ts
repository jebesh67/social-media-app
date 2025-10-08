import { create, StoreApi, UseBoundStore } from "zustand";
import { getCookie, setCookie } from "cookies-next";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  nextTheme: () => void;
}

export const useThemeStore: UseBoundStore<StoreApi<ThemeState>> = create<ThemeState>((set, get) => ({
  theme: "light",
  
  setTheme: (theme) => {
    set({theme});
    setCookie("theme", theme, {maxAge: 60 * 60 * 24 * 30}); // store for 30 days
  },
  
  nextTheme: (): void => {
    const themes: Theme[] = ["light", "dark"];
    const currentIndex: number = themes.indexOf(get().theme);
    const nextIndex: number = (currentIndex + 1) % themes.length;
    set({theme: themes[nextIndex]});
    setCookie("theme", themes[nextIndex], {maxAge: 60 * 60 * 24 * 30});
  },
}));
