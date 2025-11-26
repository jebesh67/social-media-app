"use client";

import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

type Props = {
  Component: React.ComponentType;
  buttonText: string;
}

export const ManageAccountCard = ({
  Component,
  buttonText,
}: Props) => {
  const {theme} = useThemeStore();
  const [showComponent, setShowComponent] = useState<boolean>(false);
  
  return (
    <section className={ clsx(
      "css-card-width flex flex-col gap-y-2 shadow-md rounded-xl mx-4",
      ifTheme(theme,
        "css-dark-container",
        "css-light-container"),
    ) }>
      <button
        onClick={ (): void => setShowComponent((prev: boolean): boolean => !prev) }
        className={ clsx(
          "px-4 py-2 rounded-xl css-transition hover:opacity-80 hover:cursor-pointer",
          ifTheme(theme,
            showComponent ? "bg-zinc-800" : "bg-zinc-800/50",
            showComponent ? "bg-zinc-200" : "bg-zinc-200/50",
          ),
        ) }
      >
        <p className={ "flex gap-2 items-center text-base" }>{ buttonText }
          <span
            className={ clsx(
              "inline-block transform transition-transform duration-150 text-base",
              showComponent && "rotate-90",
            ) }
          >
            <IoIosArrowForward />
          </span>
        </p>
      </button>
      
      { showComponent && <Component /> }
    </section>
  );
};
