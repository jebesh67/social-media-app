"use client";

import { AuthPageSwitch } from "@/features/auth/internal/AuthPageSwitch.internal";
import { useState } from "react";
import { PageSwitchType } from "@/features/auth/type/pageSwitch.type";
import { Login } from "@/features/auth/login/Login";
import { SignUp } from "@/features/auth/sign-up/SignUp";
import { clsx } from "clsx";
import { ifTheme } from "@/core/utils/theme/util/theme.util";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import { MdClose } from "react-icons/md";
import { useShowAuthPanelStore } from "@/core/stores/auth-panel/showAuthPanel.store";

type Props = {
  pagePath?: PageSwitchType;
  isFloating?: boolean;
}

const Auth = (
  {pagePath = "login", isFloating = false}: Props,
) => {
  const [page, setPage] = useState<PageSwitchType>(pagePath);
  
  const {theme} = useThemeStore();
  
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  return (
    <div className={ clsx(
      "fixed inset-0 flex flex-col justify-start sm:justify-center items-center sm:px-6 z-50 select-none",
      isFloating && "bg-black/30 backdrop-blur-xs overflow-y-auto",
    ) }>
      <main
        className={
          clsx("max-w-160 sm:max-w-120 w-full h-full sm:h-fit pt-8 sm:rounded-xl shadow-md",
            ifTheme(theme, "bg-zinc-900/90", "bg-zinc-50/90"),
          )
        }
      >
        {
          (isFloating) && (
            <div className={ "flex justify-end pr-6 pb-2" }>
              <button
                className={ clsx("active:opacity-80 text-xl px-3 py-2 rounded-lg hover:cursor-pointer",
                  ifTheme(theme, "hover:bg-red-500", "hover:bg-red-500/90")) }
                onClick={ (): void => setShowAuthPanel(false) }
              >
                <MdClose />
              </button>
            </div>
          )
        }
        
        <AuthPageSwitch
          page={ page }
          setPageAction={ setPage }
        />
        
        { page === "login" && <Login /> }
        { page === "sign-up" && <SignUp /> }
      </main>
    
    </div>
  );
};

export default Auth;
