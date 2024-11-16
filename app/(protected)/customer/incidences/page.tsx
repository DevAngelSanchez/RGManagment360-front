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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateInsidenceForm } from "./form";
import { IconPlus } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker built using Tanstack Table.",
};

// Fetch tasks from JSON file
async function getTasks() {
  try {
    const data = await fs.readFile(
      path.join(
        process.cwd(),
        "app/(protected)/service-provider/tasks/data/task.json"
      )
    );

    const tasks = JSON.parse(data.toString());
    return z.array(taskSchema).parse(tasks);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
  }
}

// Main Page Component
export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <LayoutSelector layout="customer">
      <main className="w-full h-full bg-slate-50">
        <section className="p-4 overflow-y-auto">
          <Fragment>

            {/* Desktop View */}
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              {/* Header */}
              <Header />

              {/* Task Table */}
              <DataTable data={tasks} columns={columns} />
            </div>
          </Fragment>
        </section>
      </main>
    </LayoutSelector>
  );
}

// Header Component
function Header() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here's a list of your tasks for this month!
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <CreateIncidentDialog />
      </div>
    </div>
  );
}

// Dialog Component for Creating Incident
function CreateIncidentDialog() {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
        <IconPlus size={24} />
        Create a new incident
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Incident</DialogTitle>
        </DialogHeader>
        <CreateInsidenceForm />
      </DialogContent>
    </Dialog>
  );
}
