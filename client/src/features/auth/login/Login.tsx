"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/core/hooks/react-query/user/mutation/useLogin";
import { UseMutationResult } from "@tanstack/react-query";
import { ILoginVariables } from "@/core/hooks/react-query/user/type/loginVariables.interface";
import clsx from "clsx";
import ShinyText from "@/features/shared/effects/shinyText/ShinyText";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CustomInput } from "@/features/shared/input/CustomInput";
import { useShowAuthPanelStore } from "@/core/stores/auth-panel/showAuthPanel.store";
import { CustomSubmitButton } from "@/features/shared/button/CustomSubmitButton.shared";
import { useTheme } from "@/core/hooks/theme/useTheme";

export const Login = () => {
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const [theme] = useTheme();
  
  const router: AppRouterInstance = useRouter();
  
  const loginMutation: UseMutationResult<IUserApiResponse, Error, ILoginVariables> = useLogin();
  
  useEffect((): void => {
    if (loginMutation.data?.success) {
      setShowAuthPanel(false);
      
      router.push("/profile");
    }
    
    // eslint-disable-next-line
  }, [loginMutation.data, router]);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    
    const trimmedUsername: string = username.trim();
    const trimmedPassword: string = password.trim();
    
    loginMutation.mutate({username: trimmedUsername, password: trimmedPassword});
  };
  
  return (
    <main className={ clsx(
      "w-full flex justify-center css-transition sm:rounded-b-xl bg-inherit/70",
    ) }>
      <form className={
        clsx(
          "flex flex-col space-y-4 justify-center items-center w-full pb-8 pt-12 rounded-xl sm:shadow-md")
      }
            onSubmit={ handleSubmit }
      >
        <ShinyText
          text="Social Media"
          disabled={ false }
          speed={ 3 }
          className="text-3xl font-semibold pb-6"
          theme={ theme }
        />
        
        <h2>Enter your credentials to login</h2>
        
        <CustomInput
          id="username"
          value={ username }
          onChange={ (e): void => setUsername(e.target.value) }
          placeholder="Username"
        />
        
        <CustomInput
          id="password"
          type="password"
          value={ password }
          onChange={ (e): void => setPassword(e.target.value) }
          placeholder="Password"
        />
        
        <CustomSubmitButton
          text={ "Login" }
          pendingText={ "Logging in..." }
          isPending={ loginMutation.isPending }
        />
        
        { loginMutation.isError && (
          <div className={ "flex text-center px-6" }>
            <div className="text-red-500">{ loginMutation.error.message }</div>
          </div>
        ) }
        {
          loginMutation.data?.success && (
            <div className={ "flex text-center px-6" }>
              <div className="text-green-500">{ loginMutation.data.message }</div>
            </div>
          )
        }
      
      </form>
    </main>
  );
};
