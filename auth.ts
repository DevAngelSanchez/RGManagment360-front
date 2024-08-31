import NextAuth from "next-auth"
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!

// export const apiUrl = "http://localhost:3001/";
export const apiUrl = process.env.API_URL || "https://rgmanagment360-backend.onrender.com/";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: '********'
        },
      },
      authorize: async (credentials) => {

        if (!credentials) {
          return null;
        }

        const res = await fetch(`${apiUrl}auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });

        if (!res.ok) {
          console.error('Hubo un error en la consulta');
          return null;
        }

        const data = await res.json();

        // Si la API devuelve un objeto de usuario válido, devuélvelo
        if (data) {
          return {
            id: `${data.id}`,
            username: data.name,
            email: data.email
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login"
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
  }
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