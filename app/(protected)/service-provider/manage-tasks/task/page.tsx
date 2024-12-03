import { Metadata } from "next";
import LayoutSelector from "@/components/custom/LayoutSelector";

import { fetchTasks } from "@/lib/fetch";
import SingularView from "@/components/custom/SingularView";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker.",
};

export default async function TaskPage() {
  const fetchResult = await fetchTasks();



  const tasksData = fetchResult.data?.map((item) => ({
    id: item.id.toString(),
    title: item.name,
    provider: item.taskProvider ? item.taskProvider.fullname : "No Provider",
    label: item.category?.name || "No Category ",
    status: item.status,
    priority: item.priority,
  }));

  //MOCK DATA
  const task = {
    title: "Task 1",
    description: "Inspect the structure of the home for cracks or damage to the foundation and walls. Check pipes for leaks or drips. Clean appliances, such as the washing machine and dryer drum, and the refrigerator.",
    dueDate: "2024-11-20",
    priority: "High",
    status: "Pending",
  };

  return (
    <LayoutSelector layout="service-provider">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <div>
            <SingularView mode="task" task={task} /> {/* task={tasksData?.[0]} */}
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}
