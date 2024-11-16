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
    provider: item.taskProvider ? item.taskProvider.name : "No Provider",
    label: item.category?.name || "No Category ",
    status: item.status,
    priority: item.priority,
  }));

  //MOCK DATA
  const propertie = {
    propertyName: "My Property",
    address: "123 Main St, Anytown, USA",
    customerName: "Jane Doe",
    phoneNumber: "555-555-5555",
    email: "T0k6o@example.com", 
    description: "This is a description of the property. It may include details such as size, location, and any other relevant information.",

  };

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="p-4 overflow-y-auto">
          <div>
            <SingularView mode="propertie" propertie={propertie} /> {/* task={tasksData?.[0]} */}
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}
