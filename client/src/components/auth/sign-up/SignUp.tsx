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
import { usernameValidation } from "@/components/auth/util/validation/usernameValidation.util";
import { emailValidation } from "@/components/auth/util/validation/emailValidation.util";
import { passwordValidation } from "@/components/auth/util/validation/passwordValidation.util";
import { confirmPasswordValidation } from "@/components/auth/util/validation/confirmPasswordValidation.util";

export const SignUp = () => {
  const {setShowAuthPanel} = useShowAuthPanelStore();
  
  const createUserMutation: UseMutationResult<IUserApiResponse, CustomError, ICreateUserVariables> = useCreateUser();
  const {data, error, isError, isPending} = createUserMutation;
  
  const [name, setName] = useState<string>("");
  
  const [email, setEmail] = useState<string>("");
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false);
  
  const [username, setUsername] = useState<string>("");
  const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false);
  
  const [password, setPassword] = useState<string>("");
  const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false);
  
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState<boolean>(false);
  
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);
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
    setIsInvalidInput(isInvalidUsername || isInvalidEmail || isInvalidPassword || isInvalidConfirmPassword);
  }, [isInvalidUsername, isInvalidEmail, isInvalidPassword, isInvalidConfirmPassword]);
  
  useEffect((): void => {
    if (error) setShowValidation(error.isValidationError || false);
  }, [error]);
  
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createUserMutation.mutate({name, username, email, password, confirmPassword});
  };
  
  const handleSetUsername = (value: string): void => {
    setUsername(value);
    setIsInvalidUsername(usernameValidation(value));
  };
  
  const handleSetEmail = (value: string): void => {
    setEmail(value);
    setIsInvalidEmail(emailValidation(value));
  };
  
  const handleSetPassword = (value: string): void => {
    setPassword(value);
    setIsInvalidConfirmPassword(!((value === confirmPassword) && (value.length >= 6)));
    setIsInvalidPassword(passwordValidation(value));
  };
  
  const handleSetConfirmPassword = (value: string): void => {
    setConfirmPassword(value);
    setIsInvalidConfirmPassword(confirmPasswordValidation(password, value));
  };
  
  return (
    <main className={ clsx(
      "w-full flex flex-col items-center justify-center css-transition sm:rounded-b-xl bg-inherit/70",
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
          onChange={ (e): void => handleSetUsername(e.currentTarget.value) }
          placeholder="New Username"
          isInvalidInput={ isInvalidUsername }
        />
        
        <CustomInput
          id="newEmail"
          value={ email }
          onChange={ (e): void => handleSetEmail(e.target.value) }
          placeholder="Your Email"
          isInvalidInput={ isInvalidEmail }
        />
        
        <CustomInput
          id="newPassword"
          type="password"
          value={ password }
          onChange={ (e): void => handleSetPassword(e.target.value) }
          placeholder="New Password"
          isInvalidInput={ isInvalidPassword }
        />
        
        <CustomInput
          id="confirmPassword"
          type="password"
          value={ confirmPassword }
          onChange={ (e): void => handleSetConfirmPassword(e.target.value) }
          placeholder="Confirm Password"
          isInvalidInput={ isInvalidConfirmPassword }
        />
        
        <button
          className={
            clsx(
              "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
              
              ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
              
              (isPending || isInvalidInput) && "opacity-60 hover:cursor-default",
            )
          }
          type="submit"
          disabled={ isPending || isInvalidInput }>
          { isPending ? "Signing up..." : "Sign up" }
        </button>
        
        
        { isError && (
          <div className={ "flex text-center px-6" }>
            <div className="text-red-500">{ error.message }</div>
          </div>
        ) }
        {
          data?.success && (
            <div className={ "flex text-center px-6" }>
              <div className="text-green-500">{ data.message }</div>
            </div>
          )
        }
      </form>
      {
        (showValidation && error) &&
        <ValidationErrorShared
          setShowValidationAction={ setShowValidation }
          value={ error } />
      }
    </main>
  );
};
