"use client";

import { RenderHeader } from "@/features/profile/main/internal/header/RenderHeader.internal";

export const ProfileHeader = () => {
  
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none z-40" }>
      <RenderHeader />
    </header>
  );
};
