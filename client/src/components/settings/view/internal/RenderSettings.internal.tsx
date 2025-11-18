"use client";

import { settingsElement } from "@/components/settings/view/data/settings.data";
import clsx from "clsx";
import { ifTheme } from "@/common/utils/theme/util/theme.util";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import Link from "next/link";
import { SettingsElement } from "@/components/settings/view/type/settings.type";

export const RenderSettingsInternal = () => {
  const {theme} = useThemeStore();
  
  return (
    <div className={ "px-4 flex flex-col w-full md:max-w-140 lg:max-w-120 space-y-2 select-none" }>
      {
        settingsElement.map((setting: SettingsElement, idx: number) => (
          <Link key={ idx }
                href={ setting.path }
                className={ "w-full" }
          >
            <button className={ clsx(
              "grid grid-cols-10 gap-x-3 w-full py-4 hover:cursor-pointer px-4 rounded-lg shadow-md css-transition hover:scale-103 active:opacity-85",
              ifTheme(theme, "bg-zinc-800/70 hover:bg-zinc-700/50", "bg-zinc-200/60 hover:bg-zinc-100"),
            ) }
                    key={ idx }>
              <div className={ "flex justify-center items-center text-2xl col-span-1" }>{ setting.logo }</div>
              <div className={ "col-span-9 flex justify-start items-center" }>{ setting.name }</div>
            </button>
          </Link>
        ))
      }
    </div>
  );
};
