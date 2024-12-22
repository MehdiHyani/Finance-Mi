export type Paginated<T> = {
  results: T[];
  count: number;
  page: number;
  pageSize: number;
};

export type Queryfied<T> =
  | {
      // Success state
      data: T;
      isLoading: false;
      error: null;
    }
  | {
      // Loading state
      data: null;
      isLoading: true;
      error: null;
    }
  | {
      // Error state
      data: null;
      isLoading: false;
      error: Error;
    };

export type Maybe<K> = K | null | undefined;
