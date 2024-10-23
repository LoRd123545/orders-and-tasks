import { z } from 'zod';

export const UpdateProductSchema = z
  .object({
    name: z.string().max(50).optional(),
    category: z.string().max(50).optional(),
    quantity: z.number().int().nonnegative().optional(),
    description: z.string().max(500).optional(),
  })
  .strict();
