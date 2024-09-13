import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/zodSchemas";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { sendVerificationEmail } from "./lib/mail";

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

        // Verificar si el email fue verificado
        if (!user.emailVerified) {
          const verificationTokenExist = await db.verificationToken.findFirst({
            where: {
              identifier: user.email,
            }
          });

          // si el token existe y no ha sido eliminado, quiere decir que el usuario no ha activado la cuenta, asi que lo eliminamos aqui
          if (verificationTokenExist?.identifier) {
            await db.verificationToken.delete({
              where: {
                identifier: user.email,
              }
            })
          }

          // creamos el token que vamos a enviar
          const token = nanoid();

          await db.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // Expira en 24hrs
            }
          });

          // enviar email
          const response = await sendVerificationEmail(user.email, token);
          console.log(response);
          throw new Error("Please check your email to validate your account!");
        }

        return user;
      },
    }),
    Google],
} satisfies NextAuthConfig