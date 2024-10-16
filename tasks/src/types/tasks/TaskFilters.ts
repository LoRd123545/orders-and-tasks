type DateFilters =
  | string
  | {
      start?: string;
      end?: string;
    };

export type TaskFilters = {
  dueTo: DateFilters;
  name: string;
  status: string;
  createdAt: DateFilters;
  updatedAt: DateFilters;
  id: string;
};
