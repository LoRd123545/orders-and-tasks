import { z } from 'zod';

export const ProductComplexFiltersSchema = z
  .object({
    limit: z.string().optional(),
    page: z.string().optional(),
    orderBy: z.string().optional(),
    sortBy: z.enum(['asc', 'desc']).optional(),
    where: z.object({
      category: z.string().max(50).optional(),
      quantity: z.number().int().nonnegative().optional(),
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
    }),
  })
  .strict();
