import { z } from "zod";

export const searchQuerySchema = z.object({

  q: z
    .string()
    .min(2, "Query must be at least 2 characters")
    .max(100),

  limit: z
    .string()
    .optional(),
});