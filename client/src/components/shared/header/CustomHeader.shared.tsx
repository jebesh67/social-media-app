"use client";

import { CustomHeaderInternal } from "@/components/shared/header/internal/CustomHeader.internal";

type Props = {
  type: "back";
  text: string;
}

export const CustomHeader = ({type, text}: Props) => {
  return (
    <header className={ "fixed top-0 w-full flex flex-col items-center justify-center select-none z-40" }>
      
      <CustomHeaderInternal
        type={ type }
        text={ text }
      />
    
    </header>
  );
};
