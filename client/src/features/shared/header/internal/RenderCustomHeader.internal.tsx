"use client";

import { useThemeStore } from "@/core/stores/theme/theme.store";
import clsx from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import ShinyText from "@/features/shared/effects/shinyText/ShinyText";
import { BackButton } from "@/features/shared/header/internal/BackButton.internal";

type Props = {
  type: "back";
  text: string;
}

export const RenderCustomHeader = ({type, text}: Props) => {
  const {theme} = useThemeStore();
  
  return (
    <div
      className={
        clsx(
          "relative w-full max-w-300 z-50 flex items-center justify-center py-2 css-transition shadow-md md:hidden",
          ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
        )
      }
    >
      {
        (type === "back") && <BackButton />
      }
      
      <ShinyText
        text={ text }
        disabled={ false }
        speed={ 3 }
        className="css-header-text"
        theme={ theme }
      />
    </div>
  );
};
