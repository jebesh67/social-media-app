"use client";

import { clsx } from "clsx";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { MdClose } from "react-icons/md";
import { RefObject, useEffect, useRef } from "react";
import { useShowOptionsMenuStore } from "@/core/stores/options-menu/showOptionsMenu.store";
import { useShowAuthPanelStore } from "@/core/stores/auth-panel/showAuthPanel.store";
import { useLogout } from "@/core/hooks/react-query/user/mutation/useLogout";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const OptionsMenu = () => {
  const {theme} = useThemeStore();
  
  const router: AppRouterInstance = useRouter();
  
  const logoutMutation = useLogout();
  
  const {setShowAuthPanel} = useShowAuthPanelStore();
  const {showOptionsMenu, setShowOptionsMenu} = useShowOptionsMenuStore();
  
  const optionsRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  
  useEffect((): () => void => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptionsMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return (): void => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setShowOptionsMenu]);
  
  const handleShowSettings = (): void => {
    setShowOptionsMenu(false);
    router.push("/settings");
  };
  
  const handleShowAuthPanel = (): void => {
    setShowOptionsMenu(false);
    setShowAuthPanel(true);
  };
  
  const handleLogout = (): void => {
    logoutMutation.mutate();
    
    setShowOptionsMenu(false);
    
    router.push("/auth");
  };
  
  
  return (
    <div className={ "fixed inset-0 z-30 pt-12 bg-black/30 backdrop-blur-xs w-full h-screen flex justify-center md:items-end md:justify-start md:pb-8 md:pl-18 lg:pl-51" }>
      <div
        ref={ optionsRef }
        className={ clsx(
          "flex flex-col space-y-2 shadow-xl mt-2 px-6 pb-6 pt-2 rounded-xl text-sm w-fit h-fit",
          ifTheme(theme,
            "bg-zinc-900/80",
            "bg-zinc-100/80",
          ),
        ) }>
        <div className={ "flex justify-end" }>
          <button
            className={ clsx("active:opacity-80 text-xl px-3 py-2 rounded-lg hover:cursor-pointer",
              ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
            onClick={ (): void => setShowOptionsMenu(!showOptionsMenu) }
          >
            <MdClose />
          </button>
        </div>
        
        <div className={ clsx(
          "border-b hidden md:block",
          ifTheme(theme, "border-zinc-600", "border-zinc-400"),
        ) }>
          <button
            className={ clsx(
              "flex w-50 pl-4 py-2 rounded-xl hover:cursor-pointer active:opacity-80 hover:scale-105 css-transition mb-2",
              ifTheme(theme,
                "hover:bg-zinc-700",
                "hover:bg-zinc-400/50",
              ),
            ) }
            onClick={ handleShowSettings }
          >
            Settings
          </button>
        </div>
        
        <button
          className={ clsx(
            "flex w-50 pl-4 py-2 rounded-xl hover:cursor-pointer active:opacity-80 hover:scale-105 css-transition",
            ifTheme(theme,
              "hover:bg-zinc-700",
              "hover:bg-zinc-400/50",
            ),
          ) }
          onClick={ handleShowAuthPanel }
        >
          Switch user
        </button>
        
        <button
          className={ clsx(
            "flex w-50 pl-4 py-2 rounded-xl hover:cursor-pointer active:opacity-80 hover:scale-105 css-transition",
            ifTheme(theme,
              "hover:bg-zinc-700",
              "hover:bg-zinc-400/50",
            ),
          ) }
          
          onClick={ handleLogout }
        >
          logout
        </button>
      </div>
    </div>
  
  );
};
