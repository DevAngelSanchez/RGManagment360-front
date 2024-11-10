import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import LayoutSelector from "@/components/custom/LayoutSelector";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";
import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";

import  {CreateInsidenceForm}  from "./form";
import { IconPlus } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.  "app/(protected)/service-provider/tasks/data/task.json"
async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "app/(protected)/service-provider/tasks/data/task.json"
    )
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <LayoutSelector layout="customer">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <Fragment>
            <div className="md:hidden">
              <Image
                src="/examples/tasks-light.png"
                width={1280}
                height={998}
                alt="Playground"
                className="block dark:hidden"
              />
              <Image
                src="/examples/tasks-dark.png"
                width={1280}
                height={998}
                alt="Playground"
                className="hidden dark:block"
              />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Welcome back!
                  </h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of your tasks for this month!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                      <IconPlus size={24} />
                      Create a new insidence
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                      
                        <DialogClose asChild>
                          <CreateInsidenceForm
                          />
                        </DialogClose>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog> 
                </div>
              </div>
              <DataTable data={tasks} columns={columns} />
            </div>
          </Fragment>
        </section>
      </main>
    </LayoutSelector>
  );
}
