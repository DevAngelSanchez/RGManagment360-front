"use server";

import { registerSchema } from "@/lib/zodSchemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import { apiUrl } from "@/auth.config";

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        error: "Invalid Data"
      }
    }

    const response = await fetch(`${apiUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: data.passwordForm.password
      })
    })

    const result = await response.json();

    if (result.title === "Error!") {
      throw new Error(result.msg);
    }

    return {
      success: true,
      title: result.title,
      msg: result.msg
    }

  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" }
  }
}