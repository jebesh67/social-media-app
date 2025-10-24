"use client";

import { AuthPageSwitchInternal } from "@/components/auth/internal/authPageSwitch.internal";
import { useState } from "react";
import { PageSwitchType } from "@/components/auth/type/pageSwitch.type";
import { Login } from "@/components/auth/login/Login";
import { SignUp } from "@/components/auth/sign-up/SignUp";
import { clsx } from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/themeStore";

export const Auth = (
  {pagePath = "login"}:
  { pagePath?: PageSwitchType },
) => {
  const [page, setPage] = useState<PageSwitchType>(pagePath);
  
  const {theme} = useThemeStore();
  
  return (
    <div className={ "fixed inset-0 flex flex-col justify-center items-center px-6" }>
      <main
        className={
          clsx("max-w-120 w-full pt-8 rounded-xl shadow-md",
            ifTheme(theme, "bg-zinc-700", "bg-zinc-200"),
          )
        }
      >
        <AuthPageSwitchInternal page={ page }
                                setPageAction={ setPage } />
        
        { page === "login" && <Login /> }
        { page === "sign-up" && <SignUp /> }
      </main>
    
    </div>
  );
};
