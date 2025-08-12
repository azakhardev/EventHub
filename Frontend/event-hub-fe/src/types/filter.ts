export type Filter = {
  expression: string;
  owned: boolean;
  important: boolean;
  private: boolean;
  from: string;
  to: string;
  order: "asc" | "desc";
};
