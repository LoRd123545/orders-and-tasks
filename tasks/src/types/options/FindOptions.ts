export type FindOptions<T> = {
  orderBy?: string;
  sortBy?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  where: T;
};
