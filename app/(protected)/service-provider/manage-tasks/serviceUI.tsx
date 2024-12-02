"use client";

import { useEffect, useState } from "react";
import { Fragment } from "react";
import { CategoriesProvider } from "@/components/contexts/categoriesContext";
import { DataTable } from "../tasks/components/data-table";
import { columns } from "../tasks/components/columns";
import { fetchTasksByProvider } from "@/lib/fetch";
import { Task } from "@/lib/types";

interface Props {
  providerId?: string;
}

interface TaskData {
  id: string;
  title: string;
  provider: string;
  label: string;
  status: string;
  date: string;
  priority: string;
}

export default function ServicesUI({ providerId }: Props) {
  const [tasksData, setTasksData] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (!providerId) {
          throw new Error("Provider ID is undefined. Please check the session.");
        }

        const fetchResult = await fetchTasksByProvider(providerId) as { data: Task[] };

        const formattedData = fetchResult.data?.map(item => ({
          id: item.id.toString(),
          title: item.name,
          provider: item.taskProvider ? item.taskProvider.fullname : "No Provider",
          label: item.category?.name || "No Category",
          status: item.status,
          date: item.datetimeAssigment || "N/A",
          priority: item.priority,
        }));

        setTasksData(formattedData || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching tasks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-5 mt-5 bg-white rounded-lg p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h2 className="text-2xl font-bold mb-4">My tasks list</h2>
      </div>
      <div className="flex flex-col items-start w-full mt-4 gap-8 mb-6 md:flex-row">
        <div className="w-full">
          <DataTable
            data={tasksData}
            columns={columns}
            inputQuery="title"
            placeholder="Filter tasks..."
          />
        </div>
      </div>
    </div>
  );
}
