"use client"
import { auth } from "@/auth";
import { signOut } from "next-auth/react";

function Dashboard() {

  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
      <h1 className="text-4xl">Dashboard</h1>
      <button onClick={() => signOut()} className="bg-white text-black px-4 py-2 rounded-md mt-4">Logout</button>
    </section>
  )
}

export default Dashboard;