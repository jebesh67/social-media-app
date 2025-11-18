"use client";

import { ChangeUsernameInternal } from "@/components/settings/manage-account/internal/ChangeUsername.internal";
import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export const ChangeUsernameCard = () => {
  const {theme} = useThemeStore();
  const [showChangeUsername, setShowChangeUsername] = useState<boolean>(false);
  
  return (
    <section className={ clsx(
      "css-card-width flex flex-col gap-y-2 shadow-md rounded-xl mx-4 px-4 py-2",
      ifTheme(theme,
        "css-dark-container",
        "css-light-container"),
    ) }>
      <button
        onClick={ (): void => setShowChangeUsername((prev: boolean): boolean => !prev) }
      >
        <p className={ "flex gap-2 items-center text-base" }>Change username
          <span
            className={ clsx(
              "inline-block transform transition-transform duration-150 text-base",
              showChangeUsername && "rotate-90",
            ) }
          >
            <IoIosArrowForward />
          </span>
        </p>
      
      </button>
      
      { showChangeUsername && <ChangeUsernameInternal /> }
    </section>
  );
};
