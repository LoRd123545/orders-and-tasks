import { FindOptions } from '@app/types/options/index.js';
import { TaskFilters } from './TaskFilters.js';

export type TaskFindOptions = FindOptions<Partial<TaskFilters>>;
