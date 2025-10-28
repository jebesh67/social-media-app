"use client";

import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/themeStore";
import ShinyText from "@/components/shared/effects/shinyText/ShinyText";
import { useUser } from "@/common/hooks/user/useUser";
import { useShowAuthOptions } from "@/common/stores/AuthNavigationControl/showAuthOptionsStore";


export const ProfileHeaderInternal = () => {
  const {theme} = useThemeStore();
  const {showAuthOptions, setShowAuthOptions} = useShowAuthOptions();
  
  const {data: currentUser, isLoading, isFetched} = useUser();
  
  return (
    <div
      className={
        clsx(
          "w-full max-w-300 z-50 flex items-center justify-center py-2 css-transition shadow-md md:hidden",
          ifTheme(theme, "css-dark-nav-container", "css-light-nav-container"),
        )
      }
    >
      <button
        className={ "hover:cursor-pointer" }
        onMouseDown={ (): void => setShowAuthOptions(!showAuthOptions) }
      >
        {
          isLoading ?
            <ShinyText
              text="Loading..."
              disabled={ false }
              speed={ 3 }
              className="css-header-text"
              theme={ theme }
            /> :
            currentUser ?
              <ShinyText
                text={ `${ currentUser.username }` }
                disabled={ false }
                speed={ 3 }
                className="css-header-text"
                theme={ theme }
              /> :
              isFetched && <div>No User Found</div>
        }
      </button>
    </div>
  );
};
