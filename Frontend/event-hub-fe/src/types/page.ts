export type Page<T> = {
  data: T[];
  pageInfo: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
};
