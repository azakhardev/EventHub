import { create } from "zustand";
import type { SELECTED_PAGE } from "../types/helpers";

type PageState = {
  selectedPage: SELECTED_PAGE;
  setSelectedPage: (page: SELECTED_PAGE) => void;
};

export const usePageStore = create<PageState>((set) => ({
  selectedPage: "home",
  setSelectedPage: (page: SELECTED_PAGE) => set({ selectedPage: page }),
}));
