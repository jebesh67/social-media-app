"use client";

import { AuthPageSwitchInternal } from "@/components/auth/internal/authPageSwitch.internal";
import { useState } from "react";
import { PageSwitchType } from "@/components/auth/type/pageSwitch.type";
import { Login } from "@/components/auth/login/Login";
import { SignUp } from "@/components/auth/sign-up/SignUp";

export const Auth = (
  {pagePath = "login"}:
  { pagePath?: PageSwitchType },
) => {
  const [page, setPage] = useState<PageSwitchType>(pagePath);
  
  return (
    <div className={ "fixed inset-0 flex flex-col justify-center items-center px-6" }>
      <AuthPageSwitchInternal page={ page }
                              setPageAction={ setPage } />
      
      { page === "login" && <Login /> }
      { page === "sign-up" && <SignUp /> }
    </div>
  );
};
