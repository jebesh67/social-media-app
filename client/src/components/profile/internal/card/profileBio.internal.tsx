import { User } from "@/types/user/user.type";

type Props = {
  currentUser: User,
}

export const ProfileBioInternal = ({currentUser}: Props) => {
  return (
    <div className={ "col-span-10 space-y-1" }>
      <p className={ "font-semibold mt-4 text-sm sm:hidden" }>{ currentUser.name }</p>
      
      {
        currentUser.bio && (
          <p className={ "font-light text-sm sm:mt-2" }>{ currentUser.bio }
          </p>
        )
      }
    
    </div>
  
  );
};
