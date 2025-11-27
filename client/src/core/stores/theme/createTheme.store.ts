import { IThemeState, Theme } from "@/core/utils/theme/type/theme.type";
import { createStore, StoreApi } from "zustand/vanilla";
import { setCookie } from "cookies-next";

export const createThemeStore = (initialTheme: Theme): StoreApi<IThemeState> =>
  createStore((set): IThemeState => ({
    theme: initialTheme,
    
    setTheme: (newTheme: Theme): void => {
      document.body.setAttribute("data-theme", newTheme);
      set({theme: newTheme});
      setCookie("theme", newTheme, {maxAge: 60 * 60 * 24 * 30});
    },
    
    nextTheme: (): void => {
      set((state: IThemeState): { theme: Theme } => {
        const newTheme: Theme = state.theme === "dark" ? "light" : "dark";
        
        document.body.setAttribute("data-theme", newTheme);
        setCookie("theme", newTheme, {maxAge: 60 * 60 * 24 * 30});
        
        return {theme: newTheme};
      });
    },
  }));
