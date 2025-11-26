import { create } from "zustand";
import { IShowOptionsMenu } from "@/core/stores/options-menu/type/showOptionsMenuStore.interface";

export const useShowOptionsMenuStore = create<IShowOptionsMenu>((set): IShowOptionsMenu => ({
  showOptionsMenu: false,
  setShowOptionsMenu: (value: boolean): void => set({showOptionsMenu: value}),
}));