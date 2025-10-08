"use client";

import { useThemeStore } from "@/stores/theme/themeStore";
import clsx from "clsx";

export const Profile = () => {
  const {theme, nextTheme} = useThemeStore();
  
  return (
    <div className={ clsx(theme === "dark" ? "bg-slate-800" : "bg-white") }>
      <button onClick={ () => nextTheme() }>theme</button>
    </div>
  );
};
