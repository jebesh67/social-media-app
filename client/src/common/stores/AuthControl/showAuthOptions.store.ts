import { create } from "zustand";
import { IShowAuthOptions } from "@/common/stores/AuthControl/type/showAuthOptionsStore.interface";

export const useShowAuthOptionsStore = create<IShowAuthOptions>((set): IShowAuthOptions => ({
  showAuthOptions: false,
  setShowAuthOptions: (value: boolean): void => set({showAuthOptions: value}),
}));