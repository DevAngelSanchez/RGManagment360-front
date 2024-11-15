import { Fragment } from "react";
import { CategoriesProvider } from "@/components/contexts/categoriesContext";
import { DataTable } from "../tasks/components/data-table";
import { columns } from "../tasks/components/columns";

export default async function ServicesUI() {
  const fetchResult = await fetchTasks();

  const tasksData = fetchResult.data?.map(item => ({
    id: item.id.toString(),
    title: item.name,
    provider: item.taskProvider ? item.taskProvider.fullname : "No Provider",
    label: item.category?.name || "No Category ",
    status: item.status,
    date: item.datetimeAssigment,
    priority: item.priority
  }));

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row  sm:justify-between">
        <h1 className="text-4xl font-bold mb-4">Incidences</h1>
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
