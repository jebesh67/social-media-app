"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/common/hooks/user/useLogin";
import { UseMutationResult } from "@tanstack/react-query";
import { ILoginVariables } from "@/common/hooks/user/type/loginVariables.interface";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";
import { IUserApiResponse } from "@/types/user/response/userApi.response";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CustomInput } from "@/components/shared/input/CustomInput";

type Props = {
  setShowAuthPanelAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Login = ({setShowAuthPanelAction}: Props) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const {theme} = useThemeStore();
  
  const router: AppRouterInstance = useRouter();
  
  const loginMutation: UseMutationResult<IUserApiResponse, Error, ILoginVariables> = useLogin();
  
  useEffect((): void => {
    if (loginMutation.data?.success) {
      setShowAuthPanelAction && setShowAuthPanelAction(false);
      
      router.push("/profile");
    }
  }, [loginMutation.data, router]);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    loginMutation.mutate({username, password});
  };
  
  return (
    <main className={ "w-full flex justify-center css-transition" }>
      <form className={
        clsx(
          "flex flex-col space-y-4 justify-center items-center w-full pb-8 pt-12 rounded-xl shadow-md")
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
        
        <button
          className={
            clsx(
              "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
              
              ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
              
              loginMutation.isPending && "opacity-60 hover:cursor-default",
            )
          }
          type="submit"
          disabled={ loginMutation.isPending }>
          { loginMutation.isPending ? "Logging in..." : "Login" }
        </button>
        
        { loginMutation.isError && (
          <div className={ "flex justify-center items-center text-center" }>
            <div className="text-red-500">{ loginMutation.error.message }</div>
          </div>
        ) }
        {
          loginMutation.data?.success && (
            <div className={ "flex justify-center items-center text-center" }>
              <div className="text-green-500">Login successful!</div>
            </div>
          )
        }
      
      </form>
    </main>
  );
};
