"use client";

import { AuthPageSwitchInternal } from "@/components/auth/internal/authPageSwitch.internal";
import { useState } from "react";
import { PageSwitchType } from "@/components/auth/type/pageSwitch.type";
import { Login } from "@/components/auth/login/Login";
import { SignUp } from "@/components/auth/sign-up/SignUp";
import { clsx } from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { MdClose } from "react-icons/md";
import { useShowAuthPanelStore } from "@/common/stores/AuthControl/showAuthPanel.store";

type Props = {
  pagePath?: PageSwitchType;
  isFloating?: boolean;
}

export const AuthShared = (
  {pagePath = "login", isFloating = false}: Props,
) => {
  const [page, setPage] = useState<PageSwitchType>(pagePath);
  
  const {theme} = useThemeStore();
  
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  return (
    <div className={ clsx(
      "fixed inset-0 flex flex-col justify-center items-center px-6 z-50",
      isFloating && "bg-black/30 backdrop-blur-xs",
    ) }>
      <main
        className={
          clsx("max-w-120 w-full pt-8 rounded-xl shadow-md",
            ifTheme(theme, "bg-zinc-700", "bg-zinc-200"),
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
        
        <AuthPageSwitchInternal
          page={ page }
          setPageAction={ setPage }
        />
        
        { page === "login" && <Login /> }
        { page === "sign-up" && <SignUp /> }
      </main>
    
    </div>
  );
};
