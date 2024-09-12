import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/zodSchemas";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export const apiUrl = "http://localhost:3001/";
// export const apiUrl = process.env.API_URL || "https://rgmanagment360-backend.onrender.com/";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {

        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials!");
        }

        // Verificar si existe el usuario
        const user = await db.user.findUnique({
          where: {
            email: data.email
          }
        });

        if (!user || !user.password) {
          throw new Error("User not found!");
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) throw new Error("Incorrect password!");

        return user;
      },
    }),
    Google],
} satisfies NextAuthConfig