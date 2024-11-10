import LayoutSelector from "@/components/custom/LayoutSelector";
import { redirect } from "next/navigation";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/lib/types";

import MyCalendar from "./calendar";
import dayjs from "dayjs";
import { auth } from "@/auth";


import { CreateTaskForm } from "./form";

export default async function page() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return redirect("/login");
  }

  if (session?.user.role === "MANAGER" || session?.user.role === "ASSISTANT") {
    return redirect("/dashboard");
  }

  if (session?.user.role === "CUSTOMER") {
    return redirect("/dashboard");
  }

  return (
    <LayoutSelector layout="customer">
      <main className="w-full h-full bg-slate-50 ">
        <section className="flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col w-full gap-2 mb-6">
            <div className="flex justify-between items-center gap-2 w-full">
              <h1 className="text-4xl font-bold">Calendar</h1>
               
              {/* NO DIALOG, CUSTOMER CANT CREATE TASKSES
              <Dialog>
                <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  <IconPlus size={24} />
                  Add New Task
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new task</DialogTitle>
                    <DialogClose asChild >
                      <CreateTaskForm accessToken={session?.user.accessToken} />
                    </DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>  */}
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
