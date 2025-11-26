"use client";

import { CustomInput } from "@/components/shared/input/CustomInput";
import { ChangeEvent, useState } from "react";
import { useUser } from "@/common/hooks/react-query/user/query/useUser";
import { CustomSubmitButton } from "@/components/shared/button/CustomSubmitButton.shared";

export const ChangeEmail = () => {
    const {data: user} = useUser();
    
    const [newEMail, setNewEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSetUsername = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setNewEmail(e.target.value);
    };
    
    const handleUpdateUser = (): void => {
      console.log("update user", newEMail);
    };
    
    return (
      <section className={ "py-4 flex flex-col justify-center items-center gap-y-4" }>
        <div className={ "flex gap-2" }>
          <p className={ "font-semibold" }>Current email:</p>
          <p>{ user?.email || "null" }</p>
        </div>
        
        <div className={ "w-full flex flex-col justify-center items-center gap-2" }>
          <CustomInput
            id={ "newEMail" }
            value={ newEMail }
            onChange={ handleSetUsername }
            placeholder={ "Enter new email" }
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
