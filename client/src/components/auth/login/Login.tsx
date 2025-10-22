"use client";

import { useState } from "react";
import { useLogin } from "@/common/hooks/user/useLogin";
import { UseMutationResult } from "@tanstack/react-query";
import { User } from "@/types/user/user.type";
import { ILoginVariables } from "@/common/hooks/user/type/loginVariables.interface";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const {theme} = useThemeStore();
  const loginMutation: UseMutationResult<User, Error, ILoginVariables> = useLogin();
  
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    loginMutation.mutate({username, password});
  };
  
  return (
    <main className={ "p-6" }>
      <form className={ clsx("flex flex-col justify-center items-center w-full",
        ifTheme(theme, "bg-zinc-700", "bg-zinc-200")) }
            onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Username"
          value={ username }
          onChange={ (e) => setUsername(e.target.value) }
        />
        <input
          type="password"
          placeholder="Password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button type="submit"
                disabled={ loginMutation.isPending }>
          { loginMutation.isPending ? "Logging in..." : "Login" }
        </button>
      </form>
      
      { loginMutation.isError && (
        <div className="error">{ loginMutation.error.message }</div>
      ) }
    </main>
  );
};
