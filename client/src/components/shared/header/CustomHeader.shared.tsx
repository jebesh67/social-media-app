"use client";

import { RenderCustomHeader } from "@/components/shared/header/internal/RenderCustomHeader.internal";

type Props = {
  type: "back";
  text: string;
}

export const CustomHeader = ({type, text}: Props) => {
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none z-40" }>
      
      <RenderCustomHeader
        type={ type }
        text={ text }
      />
    
    </header>
  );
};
