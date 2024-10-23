import { z } from 'zod';

export const TaskComplexFiltersSchema = z
  .object({
    limit: z.string().optional(),
    page: z.string().optional(),
    orderBy: z.string().optional(),
    sortBy: z.enum(['asc', 'desc']).optional(),
    where: z.object({
      name: z.string().max(50).optional(),
      dueTo: z.union([
        z.string().datetime().optional(),
        z.object({
          start: z.string().datetime().optional(),
          end: z.string().datetime().optional(),
        }),
      ]),
      createdAt: z.union([
        z.string().datetime().optional(),
        z.object({
          start: z.string().datetime().optional(),
          end: z.string().datetime().optional(),
        }),
      ]),
      updatedAt: z.union([
        z.string().datetime().optional(),
        z.object({
          start: z.string().datetime().optional(),
          end: z.string().datetime().optional(),
        }),
      ]),
      status: z.array(z.enum(['in-progress', 'not-started', 'done'])),
    }),
  })
  .strict();
