import LayoutSelector from "@/components/custom/LayoutSelector";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MyCalendar from "./calendar";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return redirect("/login");
  }

  if (session?.user.role === "MANAGER" || session?.user.role === "ASSISTANT") {
    return redirect("/dashboard");
  }

  if (session?.user.role === "SERVICE_PROVIDER") {
    return redirect("/service-provider");
  }

  return (
    <LayoutSelector layout="customer">
      <main className="w-full h-full bg-slate-50 ">
        <section className="flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col w-full gap-2 mb-6">
            <div className="flex justify-between items-center gap-2 w-full">
              <h1 className="text-4xl font-bold">Calendar</h1>
            </div>
            <Suspense fallback="Loading Calendar...">
              <MyCalendar accessToken={session?.user.accessToken} />
            </Suspense>
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}
