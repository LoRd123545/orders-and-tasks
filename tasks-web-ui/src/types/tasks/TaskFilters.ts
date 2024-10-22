import { Status } from './Status.ts';

type DateFilters =
  | string
  | {
      start?: string;
      end?: string;
    };

export type TaskFilters = {
  dueTo: DateFilters;
  name: string;
  status: string | [Status.IN_PROGRESS, Status.COMPLETED, Status.NOT_STARTED];
  createdAt: DateFilters;
  updatedAt: DateFilters;
  id: string;
};
