"use client";

import { useEffect, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";
import { IUserApiResponse } from "@/types/user/response/api/userApi.response";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CustomInput } from "@/components/shared/input/CustomInput";
import { ICreateUserVariables } from "@/common/hooks/react-query/user/type/createUserVariables.interface";
import { useCreateUser } from "@/common/hooks/react-query/user/mutation/useCreateUser";
import { useShowAuthPanelStore } from "@/common/stores/AuthControl/showAuthPanel.store";

export const SignUp = () => {
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const {theme} = useThemeStore();
  
  const router: AppRouterInstance = useRouter();
  
  const createUserMutation: UseMutationResult<IUserApiResponse, Error, ICreateUserVariables> = useCreateUser();
  
  useEffect((): void => {
    if (createUserMutation.data?.success) {
      setShowAuthPanel(false);
      
      router.push("/profile");
    }
    
    // eslint-disable-next-line
  }, [createUserMutation.data, router]);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createUserMutation.mutate({name, username, email, password});
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
        
        <h2>Create account</h2>
        
        <CustomInput
          id="name"
          value={ name }
          onChange={ (e): void => setName(e.target.value) }
          placeholder="Your Name"
        />
        
        <CustomInput
          id="username"
          value={ username }
          onChange={ (e): void => setUsername(e.target.value) }
          placeholder="Username"
        />
        
        <CustomInput
          id="email"
          value={ email }
          onChange={ (e): void => setEmail(e.target.value) }
          placeholder="Email"
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
              
              createUserMutation.isPending && "opacity-60 hover:cursor-default",
            )
          }
          type="submit"
          disabled={ createUserMutation.isPending }>
          { createUserMutation.isPending ? "Signing up..." : "Sign up" }
        </button>
        
        
        { createUserMutation.isError && (
          <div className={ "flex text-center px-6" }>
            <div className="text-red-500">{ createUserMutation.error.message }</div>
          </div>
        ) }
        {
          createUserMutation.data?.success && (
            <div className={ "flex text-center px-6" }>
              <div className="text-green-500">User successfully created!</div>
            </div>
          )
        }
      
      </form>
    </main>
  );
};
