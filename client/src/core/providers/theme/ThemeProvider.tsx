"use client";

import { Context, createContext, RefObject, useRef } from "react";
import { IThemeState, Theme } from "@/core/utils/theme/type/theme.type";
import { createThemeStore } from "@/core/stores/theme/createTheme.store";
import { StoreApi } from "zustand/vanilla";

export const ThemeStoreContext: Context<StoreApi<IThemeState> | null> = createContext<StoreApi<IThemeState> | null>(null);

const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) => {
  const storeRef: RefObject<StoreApi<IThemeState>> = useRef(createThemeStore(initialTheme));
  
  return (
    <ThemeStoreContext.Provider value={ storeRef.current }>
      { children }
    </ThemeStoreContext.Provider>
  );
};

export default ThemeProvider;
