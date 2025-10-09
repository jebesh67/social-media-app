"use client";

import { RenderNavs } from "@/components/navigation/services/RenderNavs.internal";

export const Navigation = () => {
  
  return (
    <footer className={ "fixed bottom-0 w-full flex justify-center select-none" }>
      <RenderNavs />
    </footer>
  );
};
