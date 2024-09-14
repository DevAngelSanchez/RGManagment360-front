"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/zodSchemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from 'bcryptjs';

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { data, success } = registerSchema.safeParse(values);

    if (!success) {
      return {
        error: "Invalid Data"
      }
    }

    // Verificar que el usuario exista
    const user = await db.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (user) return { error: "User already in exist!" };

    // hash password

    const passwordHashed = await bcrypt.hash(data.passwordForm.password, 10);

    // create user
    await db.user.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        password: passwordHashed
      }
    });

    await signIn("credentials", {
      email: data.email,
      password: data.passwordForm.password,
      redirect: false,
    });

    return {
      success: true
    };

  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" }
  }
}