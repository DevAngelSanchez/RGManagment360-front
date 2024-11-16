import { Fragment } from "react";
import { CategoriesProvider } from "@/components/contexts/categoriesContext";
import { DataTable } from "../tasks/components/data-table";
import { columns } from "../tasks/components/columns";
import { fetchTasksByProvider } from "@/lib/fetch";
import { auth } from "@/auth";
import { Task } from "@/lib/types";

export default async function ServicesUI() {

  const session = await auth();
  const providerId = session?.user.id;

  if (!providerId) {
    throw new Error("Provider ID is undefined. Please check the session.");
  }

  const fetchResult = await fetchTasksByProvider(providerId) as { data: Task[] };
  console.log("Task: ", fetchResult)

  const tasksData = fetchResult.data?.map(item => ({
    id: item.id.toString(),
    title: item.name,
    provider: item.taskProvider ? item.taskProvider.fullname : "No Provider",
    label: item.category?.name || "No Category ",
    status: item.status,
    date: item.datetimeAssigment || "N/A",
    priority: item.priority
  }));

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row  sm:justify-between">
        <h1 className="text-4xl font-bold mb-4">My tasks list</h1>
      </div>
      <div className="flex flex-col items-start w-full mt-4 gap-8 mb-6 md:flex-row">
        <div className=" w-full">
          <CategoriesProvider>
            <DataTable
              data={tasksData || []}
              columns={columns}
              inputQuery="title"
              placeholder="Filter tasks..."
            />
          </CategoriesProvider>
        </div>
      </div>
    </Fragment>
  );
}
