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

type DeleteState = {
  isOpen: boolean;
  dialogQuestion: string;
  setIsOpen: (isOpen: boolean) => void;
  setDialogQuestion: (item: string) => void;
  onDelete: () => Promise<void>;
  setOnDelete: (onDelete: () => Promise<void>) => void;
};

type ThemeState = {
  theme: "green" | "purple" | "blue" | "black";
  setTheme: (theme: "green" | "purple" | "blue" | "black") => void;
};

export type Filter = {
  expression: string;
  owned: boolean;
  important: boolean;
  private: boolean;
  startDate: string;
  endDate: string;
  order: "asc" | "desc";
};

type FilterState = {
  filter: Filter;
  setFilter: (filter: Filter | ((prev: Filter) => Filter)) => void;
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

export const useDeleteStore = create<DeleteState>((set) => ({
  isOpen: false,
  dialogQuestion: "",
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setDialogQuestion: (item: string) => set({ dialogQuestion: item }),
  onDelete: async () => {},
  setOnDelete: (onDelete: () => Promise<void>) => set({ onDelete }),
}));

export const useThemeStore = create<ThemeState>((set) => ({
  theme:
    (localStorage.getItem("theme") as "green" | "purple" | "blue" | "black") ||
    "green",
  setTheme: (theme: "green" | "purple" | "blue" | "black") => set({ theme }),
}));

export const useFilterStore = create<FilterState>((set) => ({
  filter: {
    expression: "",
    owned: false,
    important: false,
    private: false,
    startDate: new Date().toISOString(),
    endDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    order: "desc",
  },
  setFilter: (filter) =>
    set((state) => ({
      filter: typeof filter === "function" ? filter(state.filter) : filter,
    })),
}));
