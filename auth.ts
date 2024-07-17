import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!

const apiUrl = process.env.API_URL || "http://localhost:3001/";

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

        console.log(res);

        if (!res.ok) {
          console.error('Hubo un error en la consulta');
          return null;
        }

        const user = await res.json();

        console.log(user)

        // Si la API devuelve un objeto de usuario válido, devuélvelo
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login"
  }
})