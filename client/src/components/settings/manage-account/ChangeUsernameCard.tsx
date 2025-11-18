"use client";

import { ChangeUsernameInternal } from "@/components/settings/manage-account/internal/ChangeUsername.internal";
import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useState } from "react";

export const ChangeUsernameCard = () => {
  const {theme} = useThemeStore();
  const [showChangeUsername, setShowChangeUsername] = useState<boolean>(false);
  
  return (
    <section className={ clsx(
      "css-card-width",
      ifTheme(theme,
        "css-dark-container",
        "css-light-container"),
    ) }>
      <button
        onClick={ (): void => setShowChangeUsername((prev: boolean): boolean => !prev) }
      >
        <p>Change username
          <span
            className={ clsx(
              "inline-block transform transition-transform duration-150",
              showChangeUsername && "rotate-90",
            ) }
          >
            { ">" }
          </span>
        </p>
      
      </button>
      
      { showChangeUsername && <ChangeUsernameInternal /> }
    </section>
  );
};
