
import { Metadata } from "next";
import LayoutSelector from "@/components/custom/LayoutSelector"
import { columns } from "@/app/(protected)/service-provider/tasks/components/columns"
import { DataTable } from "@/app/(protected)/service-provider/tasks/components/data-table"

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
    label: item.category?.name || "No Category ",
    status: item.status,
    priority: item.priority
  }));

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <div className="bg-white rounded-md border shadow-black/50">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of all tasks!
                  </p>
                </div>
              </div>
              <DataTable
                data={tasksData || []}
                columns={columns}
              />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}