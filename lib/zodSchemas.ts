import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid e-mail",
  }).trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "Minimun 3 characters",
  }),
  lastname: z.string().min(3, {
    message: "Minimun 3 characters",
  }),
  username: z.string().min(3, {
    message: "Minimun 3 characters",
  }),
  email: z.string().email({
    message: "Invalid e-mail",
  }).trim(),
  passwordForm: z.object({
    password: z.string().min(6, {
      message: "Minimun 6 characters"
    }),
    confirm: z.string(),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
})