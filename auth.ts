import NextAuth from "next-auth";

import "next-auth/jwt";

import authConfig, { apiUrl } from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {

      const allowedHosts = ["www.services-flow.com", "services-flow.com"];
      const currentHost = new URL(process.env.NEXTAUTH_URL!).hostname;

      if (!allowedHosts.includes(currentHost)) {
        console.error(`Untrusted Host: ${currentHost}`);
        throw new Error("Untrusted Host detected. Access denied.");
      }

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
            token.id = String(result.id);
            token.role = result.role;
            token.expires = Math.floor(Date.now() / 1000) + 60 * 60; // Expira en 1 hora
          } else {
            // Si no está registrado, rechazamos el inicio de sesión
            throw new Error("Unauthorized: You must be registered in the app to sign in with Google.");
          }
        } else {
          // Si el usuario se loguea con credentials, ya viene con el rol desde la API de login
          token.role = user.role;
          token.accessToken = user.accessToken;
          token.expires = Math.floor(Date.now() / 1000) + 60 * 60; // Expira en 1 hora
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user = {
        id: String(token.id),
        role: token.role!,
        accessToken: token.accessToken,
        name: token.name || "", // Manejar el caso de `undefined`
        email: token.email || "", // Asignar un valor predeterminado
        emailVerified: null, // Valor predeterminado si no está disponible
      };
      return session
    },
  },
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none", // Cambia a "none" si usas HTTPS en producción
        secure: process.env.NODE_ENV === "production", // Solo en producción
      },
    },
  },
  ...authConfig,

})

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}