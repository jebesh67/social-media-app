"use client";

import { useEffect, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { useThemeStore } from "@/core/stores/theme/theme.store";
import clsx from "clsx";
import ShinyText from "@/features/shared/effects/shinyText/ShinyText";
import { IUserApiResponse } from "@/core/types/user/response/api/userApi.response";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CustomInput } from "@/features/shared/input/CustomInput";
import { ICreateUserVariables } from "@/core/hooks/react-query/user/type/createUserVariables.interface";
import { useCreateUser } from "@/core/hooks/react-query/user/mutation/useCreateUser";
import { useShowAuthPanelStore } from "@/core/stores/auth-panel/showAuthPanel.store";
import { CustomError } from "@/core/helper/error/customError.helper";
import { ValidationError } from "@/features/shared/error/validation/validationError.shared";
import { usernameValidation } from "@/core/utils/validation/usernameValidation.util";
import { emailValidation } from "@/core/utils/validation/emailValidation.util";
import { passwordValidation } from "@/core/utils/validation/passwordValidation.util";
import { confirmPasswordValidation } from "@/core/utils/validation/confirmPasswordValidation.util";
import { CustomSubmitButton } from "@/features/shared/button/CustomSubmitButton.shared";

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
  
  const [showValidation, setShowValidation] = useState<boolean>(false);
  
  const isInvalidInput: boolean = isInvalidUsername || isInvalidEmail || isInvalidPassword || isInvalidConfirmPassword;
  
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
    createUserMutation.mutate({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    });
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
    setIsInvalidPassword(passwordValidation(value));
    
    setIsInvalidConfirmPassword(confirmPasswordValidation(value, confirmPassword));
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
          invalidMessage={ "Username can only contain lowercase letters, numbers, dots (.), underscores (_), and max-14 characters." }
        />
        
        <CustomInput
          id="newEmail"
          value={ email }
          onChange={ (e): void => handleSetEmail(e.target.value) }
          placeholder="Your Email"
          isInvalidInput={ isInvalidEmail }
          invalidMessage={ "Email must be a valid email" }
        />
        
        <CustomInput
          id="newPassword"
          type="password"
          value={ password }
          onChange={ (e): void => handleSetPassword(e.target.value) }
          placeholder="New Password"
          isInvalidInput={ isInvalidPassword }
          invalidMessage={ "Password must be at least 6 characters long, and cannot contain spaces" }
        />
        
        <CustomInput
          id="confirmPassword"
          type="password"
          value={ confirmPassword }
          onChange={ (e): void => handleSetConfirmPassword(e.target.value) }
          placeholder="Confirm Password"
          isInvalidInput={ isInvalidConfirmPassword }
          invalidMessage={ "Passwords do not match" }
        />
        
        <CustomSubmitButton
          text={ "SignUp" }
          pendingText={ "Signing up..." }
          isPending={ isPending }
          isInvalidInput={ isInvalidInput }
          type="submit"
        />
        
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
        <ValidationError
          setShowValidationAction={ setShowValidation }
          value={ error } />
      }
    </main>
  );
};
