import { z } from 'zod';

const statuses = ['not-started', 'in-progress', 'done'] as const;

export const CreateTaskSchema = z
  .object({
    name: z.string().max(50).optional(),
    status: z.enum(statuses).optional(),
    dueTo: z.date().optional(),
    description: z.string().max(500).optional(),
  })
  .strict();
