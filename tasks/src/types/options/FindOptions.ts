export type FindOptions<T> = {
  orderBy?: string;
  sortBy?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  where?: T;
};
