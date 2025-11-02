import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ClientUser } from "@/types/user/user.type";

type Props = {
  user: ClientUser
}

export const EditProfileAvatarInternal = ({user}: Props) => {
  const {theme} = useThemeStore();
  
  return (
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
  );
};
