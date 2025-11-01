"use client";

import { useState } from "react";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import clsx from "clsx";
import { CustomInput } from "@/components/shared/input/CustomInput";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { User } from "@/types/user/user.type";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

type Props = {
  user: User;
}

export const EditProfileCardInternal = ({user}: Props) => {
  
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.bio);
  
  const {theme} = useThemeStore();
  
  return (
    <main className={ "w-full max-w-200 lg:max-w-160 flex justify-center css-transition px-4" }>
      <form className={
        clsx(
          "flex flex-col space-y-4 justify-center items-center w-full pb-8 pt-12 rounded-xl shadow-md",
          ifTheme(theme, "bg-zinc-700/40", "bg-zinc-400/40"),
        )
      }
            onSubmit={ () => {
            } }
      >
        
        <h2>Edit profile</h2>
        
        <section className={ clsx(
          "grid grid-cols-10 w-65 py-2 rounded-xl",
          ifTheme(theme,
            "bg-zinc-800",
            "bg-zinc-300",
          )) }
        >
          
          <div className={ "relative col-span-3 p-2" }>
            <Image
              className={ "rounded-full shadow-md" }
              src={ user.avatar || "/assets/user-profile/defaultProfile.jpg" }
              alt={ user.name }
              width={ 500 }
              height={ 500 }
              objectFit={ "contain" }
            />
            
            <button
              className={ clsx(
                "absolute bottom-0 right-0 rounded-md p-1 hover:cursor-pointer",
                ifTheme(theme, "bg-zinc-700 hover:bg-zinc-600", "bg-zinc-200 hover:bg-zinc-100"),
              ) }
              type="button"
            >
              <FaImage />
            </button>
          </div>
          
          <div className={ "col-span-4 flex flex-col justify-center px-2" }>
            <p className={ "text-base font-semibold" }>{ user.username }</p>
            
            <p className={ "text-sm font-light" }>{ user.name }</p>
          </div>
        
        </section>
        
        <CustomInput
          id="updateName"
          value={ name }
          onChange={ (e): void => setName(e.target.value) }
          placeholder="Your Name"
        />
        
        <CustomInput
          id="updateBio"
          isMultiLine={ true }
          value={ bio }
          onChange={ (e): void => setBio(e.target.value) }
          placeholder="Bio"
        />
        
        <button
          className={
            clsx(
              "py-2 mt-2 px-3 rounded-xl w-65 font-semibold hover:cursor-pointer active:opacity-80 css-transition",
              
              ifTheme(theme, "bg-blue-900 hover:bg-blue-800", "bg-blue-500/90 hover:bg-blue-400"),
            )
          }
          type="submit"
        >
          Save changes
        </button>
      
      
      </form>
    </main>
  );
};
