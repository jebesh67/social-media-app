import { ClientUser } from "@/core/types/user/user.type";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  currentUser: ClientUser,
}

export const ProfileBio = ({currentUser}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  
  return (
    <div className={ "col-span-10 space-y-1" }>
      <p className={ "font-semibold mt-4 text-sm sm:hidden" }>{ currentUser.name }</p>
      
      {
        currentUser.bio && (
          <p className={ clsx(
            "font-light text-sm sm:mt-2 whitespace-pre-wrap",
            !expanded && "line-clamp-4",
          ) }
             onClick={ (): void => setExpanded(!expanded) }
          >{ currentUser.bio }
          </p>
        )
      }
    
    </div>
  
  );
};
