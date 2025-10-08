"use client";

import { PrintNavElements } from "@/components/navigation/services/navigation.internal";

export const Navigation = () => {
  
  return (
    <footer className={ "fixed bottom-0 w-full flex justify-center select-none" }>
      <PrintNavElements />
    </footer>
  );
};
