"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/(protected)/service-provider/tasks/components/data-table";
import { customerTaskListColumns } from "@/app/(protected)/service-provider/tasks/components/columns";
import { Task } from "@/lib/types";
import { apiUrl } from "@/auth.config";
import { PropertyType } from "../service-provider/tasks/data/schema";
import { useToast } from "@/components/hooks/use-toast";

interface Props {
  clientId?: string;
}

interface TaskData {
  id: string;
  title: string;
  priority: string;
  status: string;
  property?: string;
  label: string;
  provider?: string;
  date: string;
}

export default function TaskTable({ clientId }: Props) {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!clientId) return;

      try {
        // Obtener propiedades del cliente
        const propertiesResponse = await fetch(`${apiUrl}api/properties/client/${clientId}`);
        const properties: PropertyType[] = await propertiesResponse.json();

        // Obtener tareas para cada propiedad
        const allTasks: TaskData[] = [];
        for (const property of properties) {
          const tasksResponse = await fetch(`${apiUrl}api/tasks/property/${property.id}`);
          const propertyTasks: Task[] = await tasksResponse.json();

          const formattedTasks = propertyTasks.map((task) => ({
            id: task.id.toString(),
            title: task.name,
            provider: task.taskProvider ? task.taskProvider.fullname : "No Provider",
            label: task.category?.name || "No Category ",
            status: task.status,
            date: task.datetimeAssigment || "No date",
            priority: task.priority,
            property: task.property?.name
          }));

          allTasks.push(...formattedTasks);
        }

        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
          title: "Error trying to get tasks",
          variant: "destructive"
        })
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
            data={tasks}
            columns={customerTaskListColumns}
            inputQuery="title"
            placeholder="Filter tasks..."
          />
        </div>
      </div>
    </div>
  );
}
