import { create } from "zustand";

export type SELECTED_PAGE = "home" | "calendar" | "profile" | "friends";

type PageState = {
  selectedPage: SELECTED_PAGE;
  setSelectedPage: (page: SELECTED_PAGE) => void;
};

export const usePageStore = create<PageState>((set) => ({
  selectedPage: "home",
  setSelectedPage: (page: SELECTED_PAGE) => set({ selectedPage: page }),
}));
