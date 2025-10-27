"use client";

import { clsx } from "clsx";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { MdClose } from "react-icons/md";
import { RefObject, useEffect, useRef } from "react";

type Props = {
  showAuthOptions: boolean,
  setShowAuthOptionsAction: React.Dispatch<React.SetStateAction<boolean>>
  
  setShowAuthPanelAction: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthOptionsInternal = ({
  showAuthOptions,
  setShowAuthOptionsAction,
  setShowAuthPanelAction,
}: Props) => {
  const {theme} = useThemeStore();
  const optionsRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  
  useEffect((): () => void => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowAuthOptionsAction(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return (): void => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setShowAuthOptionsAction]);
  
  const handleShowPanel = () => {
    setShowAuthOptionsAction(false);
    setShowAuthPanelAction(true);
  };
  
  
  return (
    <div className={ "md:hidden bg-black/30 backdrop-blur-xs w-full h-screen flex justify-center" }>
      <div
        ref={ optionsRef }
        className={ clsx(
          "flex flex-col space-y-2 shadow-xl mt-2 px-6 pb-6 pt-2 rounded-xl text-sm font-semibold w-fit h-fit",
          ifTheme(theme,
            "bg-zinc-700",
            "bg-zinc-200",
          ),
        ) }>
        <div className={ "flex justify-end" }>
          <button
            className={ clsx("active:opacity-80 text-xl px-3 py-2 rounded-lg hover:cursor-pointer",
              ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
            onClick={ (): void => setShowAuthOptionsAction(!showAuthOptions) }
          >
            <MdClose />
          </button>
        </div>
        
        <button
          className={ clsx(
            " w-40 py-2 rounded-xl hover:cursor-pointer hover:opacity-90 active:opacity-80 hover:scale-102 css-transition",
            ifTheme(theme,
              "bg-zinc-800",
              "bg-zinc-400/50",
            ),
          ) }
          onClick={ handleShowPanel }
        >Switch user
        </button>
        
        <button className={ clsx(
          " w-40 py-2 rounded-xl hover:cursor-pointer hover:opacity-90 active:opacity-80 hover:scale-102 css-transition",
          ifTheme(theme,
            "bg-zinc-800",
            "bg-zinc-400/50",
          ),
        ) }>logout
        </button>
      </div>
    </div>
  
  );
};
