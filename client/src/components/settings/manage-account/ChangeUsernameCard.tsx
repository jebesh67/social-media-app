"use client";

import { ChangeUsernameInternal } from "@/components/settings/manage-account/internal/ChangeUsername.internal";
import clsx from "clsx";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ifTheme } from "@/common/utils/theme/util/theme.util";

export const ChangeUsernameCard = () => {
  const {theme} = useThemeStore();
  
  return (
    <section className={ clsx(
      "css-card-width",
      ifTheme(theme,
        "css-dark-container",
        "css-light-container"),
    ) }>
      <ChangeUsernameInternal />
    </section>
  );
};
