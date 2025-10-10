"use client";

import { User } from "@/types/user/user.type";

type Props = {
  currentUser: User,
}

export const ProfileInfoInternal = ({currentUser}: Props) => {
  return (
    <div className={ "grid grid-cols-10 max-w-200 px-6" }>
      <div className={ "col-span-8 flex flex-col justify-center" }>
        <h3 className={ "font-semibold css-text-sub-head" }>{ currentUser.name }</h3>
        <div className={ "flex gap-13 sm:gap-20 md:gap-26 xl:gap-30 pt-1" }>
          <div>
            <h2 className={ "font-semibold css-text-sub-head" }>{ currentUser.counts.postsCount }</h2>
            <p className={ "leading-3" }>posts</p>
          </div>
          <div>
            <h2 className={ "font-semibold css-text-sub-head" }>{ currentUser.counts.followersCount }</h2>
            <p className={ "leading-3" }>followers</p>
          </div>
          <div>
            <h2 className={ "font-semibold css-text-sub-head" }>{ currentUser.counts.postsCount }</h2>
            <p className={ "leading-3" }>following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
