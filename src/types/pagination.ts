export type Pagination<T> = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  data: T[];
}
