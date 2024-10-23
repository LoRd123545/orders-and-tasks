import { z } from 'zod';

export const CreateProductSchema = z
  .object({
    name: z.string().max(50),
    category: z.string().max(50),
    description: z.string().max(500).optional(),
    quantity: z.number().int().nonnegative().optional(),
  })
  .strict();
