import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Not valid email",
  }).trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  name: z.string().min(3, {
    message: "name has to be at least 3 characters long",
  }),
  lastname: z.string().min(3, {
    message: "lastname has to be at least 3 characters long",
  }),
  username: z.string().min(3, {
    message: "Username has to be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Not valid email",
  }).trim(),
  passwordForm: z.object({
    password: z.string().min(6, {
      message: "Password has to be at least 6 characters long"
    }),
    confirm: z.string(),
  }).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
})