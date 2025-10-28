import { create } from "zustand";
import { IShowAuthOptions } from "@/common/stores/AuthNavigationControl/type/showAuthOptionsStore.interface";

export const useShowAuthOptions = create<IShowAuthOptions>((set): IShowAuthOptions => ({
  showAuthOptions: false,
  setShowAuthOptions: (value: boolean): void => set({showAuthOptions: value}),
}));