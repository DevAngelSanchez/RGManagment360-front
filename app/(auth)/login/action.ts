"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/zodSchemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn('credentials', {
      redirect: false,
      email: values?.email,
      password: values?.password
    });

  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" }
  }
}