import { FindOptions } from '@app/types/options/index.js';
import { Task } from './Task.js';

export type TaskFindOptions = FindOptions<Partial<Task>>;
