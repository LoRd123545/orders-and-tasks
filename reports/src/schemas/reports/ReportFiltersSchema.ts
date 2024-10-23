import { z } from 'zod';

export const ReportFiltersSchema = z
  .object({
    limit: z.string().optional(),
    page: z.string().optional(),
    orderBy: z.string().optional(),
    sortBy: z.enum(['asc', 'desc']).optional(),
  })
  .strict();
