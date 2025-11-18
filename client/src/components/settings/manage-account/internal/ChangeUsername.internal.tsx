"use client";

import { CustomInputShared } from "@/components/shared/input/CustomInput.shared";
import { ChangeEvent, useState } from "react";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";
import { CustomSubmitButtonShared } from "@/components/shared/button/CustomSubmitButton.shared";

export const ChangeUsernameInternal = () => {
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
      <section className={ "flex flex-col justify-center items-center gap-y-4" }>
        <div className={ "flex gap-2" }>
          <p className={ "font-semibold" }>Current username:</p>
          <p>{ user?.username || "No user found!" }</p>
        </div>
        
        <div className={ "w-full flex flex-col justify-center items-center gap-2" }>
          <CustomInputShared
            id={ "newUsername" }
            value={ newUsername }
            onChange={ handleSetUsername }
            placeholder={ "Enter new username" }
            width={ "large" }
          />
          
          <CustomInputShared
            id={ "currentPassword" }
            value={ password }
            onChange={ (e): void => setPassword(e.target.value) }
            placeholder={ "Enter password" }
            width={ "large" }
          />
          
          <CustomSubmitButtonShared
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
