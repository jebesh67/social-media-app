"use client";

import { ProfileHeaderInternal } from "@/components/profile/internal/header/ProfileHeader.internal";
import { useState } from "react";
import { AuthPanelInternal } from "@/components/profile/internal/header/AuthPanel.internal";

export const ProfileHeader = () => {
  const [showAuthPanel, setShowAuthPanel] = useState<boolean>(false);
  
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none" }>
      <ProfileHeaderInternal
        showAuthPanel={ showAuthPanel }
        setShowAuthPanel={ setShowAuthPanel }
      />
      
      {
        showAuthPanel && (
          <AuthPanelInternal
            showAuthPanel={ showAuthPanel }
            setShowAuthPanel={ setShowAuthPanel }
          />
        )
      }
    </header>
  );
};
