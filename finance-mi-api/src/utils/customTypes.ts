export type Paginated<K> = {
  results: K[];
  count: number;
  page: number;
  pageSize: number;
};
