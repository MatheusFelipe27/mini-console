import { z } from "zod";

export const leadSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email"),
  status: z
    .enum(["Converted", "Interested", "Deconverted"])
});

export type LeadSchema = z.infer<typeof leadSchema>;
