import NextAuth from "next-auth";

import "next-auth/jwt";

import authConfig from "@/auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.accessToken = user.accessToken;
      }

      if (account && account.provider === "google") {
        token.accessToken = account.access_token;
      }

      return token
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