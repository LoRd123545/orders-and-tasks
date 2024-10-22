import { FindOptions } from 'src/types/options';
import { TaskFilters } from './TaskFilters.ts';

export type TaskFindOptions = FindOptions<Partial<TaskFilters>>;
