"use client";

import clsx from "clsx";
import { ifTheme } from "@/utils/theme/theme.internal";
import { useThemeStore } from "@/stores/theme/themeStore";
import ShinyText from "@/effects/shinyText/ShinyText";

export const ProfileHeaderInternal = () => {
  const {theme} = useThemeStore();
  
  return (
    <div
      className={
        clsx(
          "w-full max-w-300 z-50 flex items-center justify-around m-2 rounded-full py-2 css-transition",
          ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
        )
      }
    >
      <ShinyText
        text="_jebexhh"
        disabled={ false }
        speed={ 3 }
        className="css-header-text flex justify-start w-full ml-6 sm:ml-8 xl:ml-10 py-2"
        theme={ theme }
      />
    </div>
  );
};
