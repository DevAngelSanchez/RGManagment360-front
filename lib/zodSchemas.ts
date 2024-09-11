import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Not valid email",
  }).trim(),
  password: z.string().trim(),
});
