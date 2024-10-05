import NextAuth from "next-auth";

import "next-auth/jwt";

import authConfig, { apiUrl } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Si el usuario ha iniciado sesión por primera vez
      if (user) {
        token.accessToken = user.accessToken || account?.access_token;

        if (account && account.provider === "google") {
          // Realizar petición para verificar si el usuario ya está registrado en tu app
          const response = await fetch(`${apiUrl}auth/getUserRole`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: token.email }),
          });

          const result = await response.json();

          if (result.success) {
            // Si el usuario está registrado, asignamos el rol correspondiente
            token.role = result.role;
          } else {
            // Si no está registrado, rechazamos el inicio de sesión
            throw new Error("Unauthorized: You must be registered in the app to sign in with Google.");
          }
        } else {
          // Si el usuario se loguea con credentials, ya viene con el rol desde la API de login
          token.role = user.role;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.user.username = token.username;
      return session
    },
  },
  ...authConfig,

})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}