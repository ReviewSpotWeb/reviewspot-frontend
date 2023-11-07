export type PaginationInfo = {
  offset: number;
  limit: number;
};

export type AlbumPaginationInfo = {
  next: PaginationInfo | null;
  prev: PaginationInfo | null;
  page: PaginationInfo;
  total: number;
};
