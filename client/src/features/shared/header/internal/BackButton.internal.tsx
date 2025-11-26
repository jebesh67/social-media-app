"use client";

import { useThemeStore } from "@/core/stores/theme/theme.store";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { IoChevronBackOutline } from "react-icons/io5";

export const BackButton = () => {
  const {theme} = useThemeStore();
  
  const router = useRouter();
  
  const handleClick = () => {
    router.back();
  };
  
  return (
    <button
      className={ clsx(
        "absolute left-1 text-2xl px-2 py-1 rounded-md hover:cursor-pointer",
        ifTheme(theme, "hover:bg-zinc-700 active:bg-zinc-600", "hover:bg-zinc-400/70 active:bg-zinc-400/50"),
      ) }
      onClick={ handleClick }
    >
      <IoChevronBackOutline />
    </button>
  );
};
