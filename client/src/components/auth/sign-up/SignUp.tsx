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
import { CustomError } from "@/common/helper/error/customError.helper";
import { ValidationErrorShared } from "@/components/shared/error/validation/validationError.shared";

export const SignUp = () => {
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  const createUserMutation: UseMutationResult<IUserApiResponse, CustomError, ICreateUserVariables> = useCreateUser();
  const {data, error, isError, isPending} = createUserMutation;
  
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reEnterPassword, setReEnterPassword] = useState<string>("");
  const [showValidation, setShowValidation] = useState<boolean>(false);
  
  const {theme} = useThemeStore();
  
  const router: AppRouterInstance = useRouter();
  
  useEffect((): void => {
    if (createUserMutation.data?.success) {
      setShowAuthPanel(false);
      router.push("/profile");
    }
    // eslint-disable-next-line
  }, [createUserMutation.data]);
  
  useEffect((): void => {
    if (error) setShowValidation(error.isValidationError || false);
  }, [error]);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createUserMutation.mutate({name, username, email, password});
  };
  
  return (
    <main className={ clsx(
      "w-full flex justify-center css-transition sm:rounded-b-xl",
      ifTheme(theme, "bg-zinc-700", "bg-zinc-200"),
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
        
        <h2>Create account</h2>
        
        <CustomInput
          id="newName"
          value={ name }
          onChange={ (e): void => setName(e.target.value) }
          placeholder="Your Name"
        />
        
        <CustomInput
          id="newUsername"
          value={ username }
          onChange={ (e): void => setUsername(e.target.value) }
          placeholder="New Username"
        />
        
        <CustomInput
          id="newEmail"
          value={ email }
          onChange={ (e): void => setEmail(e.target.value) }
          placeholder="Your Email"
        />
        
        <CustomInput
          id="newPassword"
          type="password"
          value={ password }
          onChange={ (e): void => setPassword(e.target.value) }
          placeholder="New Password"
        />
        
        <CustomInput
          id="reEnterPassword"
          type="password"
          value={ reEnterPassword }
          onChange={ (e): void => setReEnterPassword(e.target.value) }
          placeholder="Re-Enter Password"
          isRequired={ false }
        />
        
        <button
          className={
            clsx(
              "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
              
              ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
              
              isPending && "opacity-60 hover:cursor-default",
            )
          }
          type="submit"
          disabled={ isPending }>
          { isPending ? "Signing up..." : "Sign up" }
        </button>
        
        
        { isError && (
          <div className={ "flex text-center px-6" }>
            <div className="text-red-500">{ error.message }</div>
          </div>
        ) }
        {
          (showValidation && error) &&
          <ValidationErrorShared
            setShowValidationAction={ setShowValidation }
            value={ error } />
        }
        {
          data?.success && (
            <div className={ "flex text-center px-6" }>
              <div className="text-green-500">{ data.message }</div>
            </div>
          )
        }
      
      </form>
    </main>
  );
};
