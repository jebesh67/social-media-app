"use client";

import { CustomInput } from "@/features/shared/input/CustomInput";
import { ChangeEvent, useState } from "react";
import { useUser } from "@/core/hooks/react-query/user/query/useUser";
import { CustomSubmitButton } from "@/features/shared/button/CustomSubmitButton.shared";

export const ChangeUsername = () => {
    const {data: user} = useUser();
    
    const [newUsername, setNewUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSetUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setNewUsername(e.target.value);
    };
    
    const handleUpdateUser = (): void => {
      console.log("update user", newUsername);
    };
    
    return (
      <section className={ "py-4 flex flex-col justify-center items-center gap-y-4" }>
        <div className={ "flex gap-2" }>
          <p className={ "font-semibold" }>Current username:</p>
          <p>{ user?.username || "null" }</p>
        </div>
        
        <div className={ "w-full flex flex-col justify-center items-center gap-2" }>
          <CustomInput
            id={ "newUsername" }
            value={ newUsername }
            onChange={ handleSetUsername }
            placeholder={ "Enter new username" }
            width={ "large" }
          />
          
          <CustomInput
            id={ "currentPassword" }
            value={ password }
            onChange={ (e): void => setPassword(e.target.value) }
            placeholder={ "Enter password" }
            width={ "large" }
          />
          
          <CustomSubmitButton
            text={ "Update" }
            pendingText={ "Updating..." }
            onClick={ handleUpdateUser }
            type={ "button" }
          />
        </div>
      </section>
    );
  }
;
