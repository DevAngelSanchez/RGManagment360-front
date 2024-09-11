import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const apiUrl = "http://localhost:3001/";
// export const apiUrl = process.env.API_URL || "https://rgmanagment360-backend.onrender.com/";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {

        console.log(credentials);

        if (credentials.email !== "angel@test.com") {
          throw new Error("Invalid Credentials");
        }

        return {
          id: "1",
          name: "Angel Test",
          email: "angel@test.com"
        }

        // if (!credentials) {
        //   return null;
        // }

        // const res = await fetch(`${apiUrl}auth/login`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password
        //   })
        // });

        // if (!res.ok) {
        //   console.error('Hubo un error en la consulta');
        //   return null;
        // }

        // const data = await res.json();

        // // Si la API devuelve un objeto de usuario válido, devuélvelo
        // if (data) {
        //   return {
        //     id: `${data.id}`,
        //     username: data.name,
        //     email: data.email
        //   };
        // } else {
        //   return null;
        // }
      },
    }),
    Google],
} satisfies NextAuthConfig