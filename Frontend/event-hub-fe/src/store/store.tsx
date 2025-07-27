import { create } from "zustand";
import type { SELECTED_PAGE } from "../types/helpers";

type PageState = {
  selectedPage: SELECTED_PAGE;
  setSelectedPage: (page: SELECTED_PAGE) => void;
};

type UserState = {
  token: string;
  setToken: (token: string) => void;
  userId: number;
  setUserId: (userId: number) => void;
};

export const usePageStore = create<PageState>((set) => ({
  selectedPage: "home",
  setSelectedPage: (page: SELECTED_PAGE) => set({ selectedPage: page }),
}));

export const useUserStore = create<UserState>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
  userId: 0,
  setUserId: (userId: number) => set({ userId }),
}));
