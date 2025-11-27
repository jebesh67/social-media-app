import { useContext } from "react";
import { ThemeStoreContext } from "@/core/providers/theme/ThemeProvider";
import { StoreApi } from "zustand/vanilla";
import { IThemeState, Theme } from "@/core/utils/theme/type/theme.type";
import { useStore } from "zustand/react";

export const useTheme = (): [Theme, (newTheme: Theme) => void] => {
  const store: StoreApi<IThemeState> | null = useContext(ThemeStoreContext);
  
  if (!store) throw new Error("useTheme must be used within ThemeProvider");
  
  const theme: Theme = useStore(store, (state: IThemeState): Theme => state.theme);
  const setTheme: (theme: Theme) => void = useStore(store, (state: IThemeState): (theme: Theme) => void => state.setTheme);
  
  return [theme, setTheme];
};
