"use client";

import { ProfileHeaderInternal } from "@/components/profile/internal/header/ProfileHeader.internal";
import { useState } from "react";
import { AuthOptionsInternal } from "@/components/profile/internal/header/AuthOptions.internal";
import { AuthShared } from "@/components/auth/Auth.shared";
import { useShowAuthOptions } from "@/common/stores/AuthNavigationControl/showAuthOptionsStore";

export const ProfileHeader = () => {
  const [showAuthPanel, setShowAuthPanel] = useState<boolean>(false);
  
  const {showAuthOptions} = useShowAuthOptions();
  
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none z-40" }>
      <ProfileHeaderInternal />
      
      {
        showAuthOptions && (
          <AuthOptionsInternal
            setShowAuthPanelAction={ setShowAuthPanel }
          />
        )
      }
      
      {
        showAuthPanel && (<AuthShared isFloating={ true }
                                      setShowAuthPanelAction={ setShowAuthPanel } />)
      }
    </header>
  );
};
