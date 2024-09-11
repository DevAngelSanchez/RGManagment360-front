import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/lib/db";

import "next-auth/jwt";

import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login"
  },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  ...authConfig,
  session: {
    strategy: "jwt"
  },
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