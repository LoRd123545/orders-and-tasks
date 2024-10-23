import { z } from 'zod';

export const OrderComplexFiltersSchema = z
  .object({
    limit: z.string().optional(),
    page: z.string().optional(),
    orderBy: z.string().optional(),
    sortBy: z.enum(['asc', 'desc']).optional(),
    where: z.object({
      productID: z.string().uuid().optional(),
      email: z.string().email().max(255).optional(),
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
