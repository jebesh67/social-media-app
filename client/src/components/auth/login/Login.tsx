"use client";

import { useState } from "react";
import { useLogin } from "@/common/hooks/user/useLogin";
import { UseMutationResult } from "@tanstack/react-query";
import { ILoginVariables } from "@/common/hooks/user/type/loginVariables.interface";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";
import { IUserApiResponse } from "@/types/user/response/userApi.response";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const {theme} = useThemeStore();
  const loginMutation: UseMutationResult<IUserApiResponse, Error, ILoginVariables> = useLogin();
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    loginMutation.mutate({username, password});
  };
  
  return (
    <main className={ "fixed inset-0 flex justify-center items-center px-6" }>
      <form className={ clsx(
        "flex flex-col space-y-4 justify-center items-center w-full max-w-120 pb-8 pt-12 rounded-xl shadow-md",
        ifTheme(theme, "bg-zinc-700", "bg-zinc-200"))
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
        
        <input
          className={ clsx("py-3 px-5 rounded-xl w-65 text-xs",
            ifTheme(theme, "bg-zinc-800/70 text-zinc-300", "bg-zinc-200"))
          }
          type="text"
          placeholder="Username"
          value={ username }
          onChange={ (e): void => setUsername(e.target.value) }
        />
        
        <input
          className={ clsx("py-3 px-5 rounded-xl w-65 text-xs",
            ifTheme(theme, "bg-zinc-800/70 text-zinc-300", "bg-zinc-200"))
          }
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ (e): void => setPassword(e.target.value) }
        />
        
        <button
          className={ clsx(
            "py-2 mt-2 px-3 rounded-xl w-65",
            ifTheme(theme, "bg-blue-900", "bg-blue-400"))
          }
          type="submit"
          disabled={ loginMutation.isPending }>
          { loginMutation.isPending ? "Logging in..." : "Login" }
        </button>
        
        { loginMutation.isError && (
          <div className="text-red-500">{ loginMutation.error.message }</div>
        ) }
        {
          loginMutation.data?.success && (
            <div className="text-green-500">Login successful!</div>
          )
        }
      
      </form>
    </main>
  );
};
