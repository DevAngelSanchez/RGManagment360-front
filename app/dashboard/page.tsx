import { auth } from "@/auth";

export default async function Dashboard() {

  const session = await auth();
  console.log(session)

  if (session === null) {
    return (
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
        <h1 className="text-4xl">No autorizado, por favor inicia sesion</h1>
        <a href="/auth/login">Login</a>
      </section>
    )
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
      <h1 className="text-4xl">Dashboard</h1>
      <p>Bienvenido a tu panel de administrador
        <span className="text-indigo-600 font-semibold"> {session.user?.email}</span>
      </p>
    </section>
  )
}
