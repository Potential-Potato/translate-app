import { z } from "zod";

export const Lang = z.object({
  code: z.enum(["en", "fr", "es"]).default("en"),
  label: z.string(),
});
export type langInput = z.infer<typeof Lang>;

export const schema = z.object({
  content: z.string().max(500, "Maximum 500 characters only."),
  sourceLang: z.enum(["en", "fr", "es"]),
});
export type schemaInput = z.infer<typeof schema>;
