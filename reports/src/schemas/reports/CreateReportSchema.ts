import { z } from 'zod';

type anyObj = Record<string, any>;

export const CreateReportSchema = z
  .object({
    name: z.string().max(50),
    description: z.string().max(500).optional(),
    data: z.array(z.record(z.string(), z.any())),
  })
  .strict();
