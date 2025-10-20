"use client";

import { RenderNavs } from "@/components/navigation/internal/RenderNavs.internal";

export const Navigation = () => {
  
  return (
    <footer className={ "fixed bottom-0 w-full md:w-fit select-none" }>
      <RenderNavs />
    </footer>
  );
};
