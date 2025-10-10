"use client";

import clsx from "clsx";
import { ifTheme } from "@/utils/theme/helper/theme.helper";
import { useThemeStore } from "@/stores/theme/themeStore";
import ShinyText from "@/effects/shinyText/ShinyText";
import { useUser } from "@/hooks/user/useUser";

export const ProfileHeaderInternal = () => {
  const {theme} = useThemeStore();
  
  const {data: currentUser, isLoading, isFetched} = useUser();
  isFetched && console.log("user", currentUser);
  
  return (
    <div
      className={
        clsx(
          "w-full max-w-300 z-50 flex items-center justify-around m-2 rounded-full py-2 css-transition shadow-md",
          ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
        )
      }
    >
      
      { isLoading ?
        <ShinyText
          text="Loading..."
          disabled={ false }
          speed={ 3 }
          className="css-header-text flex justify-start w-full ml-6 sm:ml-8 xl:ml-10 py-2"
          theme={ theme }
        /> :
        currentUser ?
          <ShinyText
            text={ `${ currentUser.username }` }
            disabled={ false }
            speed={ 3 }
            className="css-header-text flex justify-start w-full ml-6 sm:ml-8 xl:ml-10 py-2"
            theme={ theme }
          /> :
          isFetched && <div>No User Found</div> }
    </div>
  );
};
