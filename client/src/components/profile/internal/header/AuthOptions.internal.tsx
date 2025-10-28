"use client";

import { clsx } from "clsx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { MdClose } from "react-icons/md";
import { RefObject, useEffect, useRef } from "react";
import { useShowAuthOptions } from "@/common/stores/AuthNavigationControl/showAuthOptionsStore";

type Props = {
  setShowAuthPanelAction: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthOptionsInternal = ({
  setShowAuthPanelAction,
}: Props) => {
  const {theme} = useThemeStore();
  const {showAuthOptions, setShowAuthOptions} = useShowAuthOptions();
  
  const optionsRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  
  useEffect((): () => void => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowAuthOptions(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return (): void => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setShowAuthOptions]);
  
  const handleShowPanel = () => {
    setShowAuthOptions(false);
    setShowAuthPanelAction(true);
  };
  
  
  return (
    <div className={ "bg-black/30 backdrop-blur-xs w-full h-screen flex justify-center md:items-end md:justify-start md:pb-8 md:pl-2" }>
      <div
        ref={ optionsRef }
        className={ clsx(
          "flex flex-col space-y-2 shadow-xl mt-2 px-6 pb-6 pt-2 rounded-xl text-sm w-fit h-fit",
          ifTheme(theme,
            "bg-zinc-800",
            "bg-zinc-300",
          ),
        ) }>
        <div className={ "flex justify-end" }>
          <button
            className={ clsx("active:opacity-80 text-xl px-3 py-2 rounded-lg hover:cursor-pointer",
              ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
            onClick={ (): void => setShowAuthOptions(!showAuthOptions) }
          >
            <MdClose />
          </button>
        </div>
        
        <button
          className={ clsx(
            "flex w-50 pl-4 py-2 rounded-xl hover:cursor-pointer active:opacity-80 hover:scale-102 css-transition",
            ifTheme(theme,
              "hover:bg-zinc-700",
              "hover:bg-zinc-400/50",
            ),
          ) }
          onClick={ handleShowPanel }
        >
          Switch user
        </button>
        
        <button className={ clsx(
          "flex w-50 pl-4 py-2 rounded-xl hover:cursor-pointer active:opacity-80 hover:scale-102 css-transition",
          ifTheme(theme,
            "hover:bg-zinc-700",
            "hover:bg-zinc-400/50",
          ),
        ) }>
          logout
        </button>
      </div>
    </div>
  
  );
};
