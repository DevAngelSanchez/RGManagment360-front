import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/zodSchemas";

// export const apiUrl = "http://localhost:3001/";
export const apiUrl = process.env.API_URL || "https://rgmanagment360-backend.onrender.com/";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {

        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials!");
        }

        const response = await fetch(`${apiUrl}auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        });

        const result = await response.json();

        if (result.type === "error") {
          throw new Error(result.msg)
        }

        return result;
      },
    }),
    Google(
      {
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        authorization: {
          params: {
            scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events"
          }
        }
      }
    )
  ],
} satisfies NextAuthConfig