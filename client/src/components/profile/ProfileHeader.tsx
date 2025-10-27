"use client";

import { ProfileHeaderInternal } from "@/components/profile/internal/header/ProfileHeader.internal";
import { useState } from "react";
import { AuthOptionsInternal } from "@/components/profile/internal/header/AuthOptions.internal";
import { AuthShared } from "@/components/auth/Auth.shared";

export const ProfileHeader = () => {
  const [showAuthOptions, setShowAuthOptions] = useState<boolean>(false);
  const [showAuthPanel, setShowAuthPanel] = useState<boolean>(false);
  
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none" }>
      <ProfileHeaderInternal
        showAuthOptions={ showAuthOptions }
        setShowAuthOptionsAction={ setShowAuthOptions }
      />
      
      {
        showAuthOptions && (
          <AuthOptionsInternal
            showAuthOptions={ showAuthOptions }
            setShowAuthOptionsAction={ setShowAuthOptions }
            
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
