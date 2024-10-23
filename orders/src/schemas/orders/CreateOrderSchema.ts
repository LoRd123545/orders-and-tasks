import { z } from 'zod';

export const CreateOrderSchema = z
  .object({
    productID: z.string().uuid(),
    email: z.string().email().max(255),
    billingAddress: z.string().max(255),
  })
  .strict();
