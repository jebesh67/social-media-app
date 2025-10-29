import { create } from "zustand";
import { IShowAuthPanel } from "@/common/stores/AuthControl/type/showAuthPanelStore.interface";

export const useShowAuthPanelStore = create<IShowAuthPanel>((set): IShowAuthPanel => ({
  showAuthPanel: false,
  setShowAuthPanel: (value: boolean): void => set({showAuthPanel: value}),
}));