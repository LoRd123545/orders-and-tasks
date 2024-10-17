import { FindOptions } from '@app/types/options/index.js';
import { OrderFilters } from './OrderFilters.js';

export type OrderFindOptions = FindOptions<Partial<OrderFilters>>;
