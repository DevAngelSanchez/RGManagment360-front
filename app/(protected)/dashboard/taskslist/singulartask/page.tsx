
import { Metadata } from "next";
import LayoutSelector from "@/components/custom/LayoutSelector"

import { fetchTasks } from "@/lib/fetch";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker."
}

export default async function TaskPage() {
  const fetchResult = await fetchTasks();

  const tasksData = fetchResult.data?.map(item => ({
    id: item.id.toString(),
    title: item.name,
    provider: item.taskProvider ? item.taskProvider.name : "No Provider",
    label: item.category?.name || "No Category ",
    status: item.status,
    priority: item.priority
  }));

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <div>
            <h1> SINGULAR PAGE</h1>
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}