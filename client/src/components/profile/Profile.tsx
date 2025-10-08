"use client";

import { useThemeStore } from "@/stores/theme/themeStore";
import clsx from "clsx";

export const Profile = () => {
  const {theme} = useThemeStore();
  
  return (
    <div>
      profile
    </div>
  );
};
