import { z } from 'zod';

type anyObj = Record<string, any>;

export const UpdateReportSchema = z
  .object({
    name: z.string().max(50).optional(),
    data: z.array(z.custom<anyObj>()).optional(),
    description: z.string().max(500).optional(),
  })
  .strict();
