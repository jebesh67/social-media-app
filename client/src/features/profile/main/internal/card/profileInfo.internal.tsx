"use client";

import { ClientUser } from "@/core/types/user/user.type";

type Props = {
  currentUser: ClientUser,
}

export const ProfileInfo = ({currentUser}: Props) => {
  return (
    <div className={ "col-span-8 w-full place-content-center" }>
      <div className={ "ml-6 flex flex-col space-y-2 w-full sm:w-fit justify-center" }>
        
        <h3 className={ "font-semibold css-profile-card-username" }>{ currentUser.username }</h3>
        
        <h3 className={ "hidden sm:block font-light text-sm" }>{ currentUser.name }</h3>
        
        <div className={ "flex justify-between w-full pr-8 gap-4 sm:gap-8 t-1" }>
          <div className={ " flex flex-col sm:flex-row sm:items-center space-x-1" }>
            <h2 className={ "font-semibold text-sm" }>{ currentUser.counts.postsCount }</h2>
            <p className={ "leading-3 text-xs font-light" }>posts</p>
          </div>
          
          <div className={ " flex flex-col sm:flex-row sm:items-center space-x-1" }>
            <h2 className={ "font-semibold text-sm" }>{ currentUser.counts.followersCount }</h2>
            <p className={ "leading-3 text-xs font-light" }>followers</p>
          </div>
          
          <div className={ " flex flex-col sm:flex-row sm:items-center space-x-1" }>
            <h2 className={ "font-semibold text-sm" }>{ currentUser.counts.postsCount }</h2>
            <p className={ "leading-3 text-xs font-light" }>following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
