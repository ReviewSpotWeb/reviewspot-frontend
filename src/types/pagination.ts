export type PageInfo = {
  offset: number;
  limit: number;
};

export type PaginationInfo = {
  next: PageInfo | null;
  prev: PageInfo | null;
  page: PageInfo;
  total: number;
};
