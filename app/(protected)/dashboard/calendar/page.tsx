import LayoutSelector from "@/components/custom/LayoutSelector";
import { redirect } from "next/navigation";

import { Suspense } from "react";

import MyCalendar from "./calendar";
import { auth } from "@/auth";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";

import { IconPlus } from "@tabler/icons-react";
import { CreateTaskForm } from "./form";

export default async function page() {

  const session = await auth();

  if (!session?.user?.accessToken) {
    return redirect("/login");
  }

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col w-full gap-2 mb-6">
            <div className="flex justify-between items-center gap-2 w-full">
              <h1 className="text-4xl font-bold">Calendar</h1>
              <Dialog>
                <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  <IconPlus size={24} />
                  Add New Task
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new task</DialogTitle>
                    <DialogClose asChild >
                      <CreateTaskForm accessToken={session?.user?.accessToken} />
                    </DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Suspense fallback="Loading Calendar...">
              <MyCalendar accessToken={session?.user?.accessToken} />
            </Suspense>
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}
