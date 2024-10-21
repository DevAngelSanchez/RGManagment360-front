"use client"
import { IconDots, IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { labels } from "../data/data";
import { taskSchema } from "../data/schema"
import { apiUrl } from "@/auth.config";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original)

  const statusOptions = ["todo", "in progress", "done", "canceled"];
  const priorityOptions = ["low", "medium", "high"];

  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`${apiUrl}api/delete-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    });

    if (response.ok) {
      console.log("task delete successfully")
      window.location.reload();
    } else {
      console.log("Error trying to delete this task")
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <IconDots className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edit status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.status}
              onValueChange={async (newStatus) => {
                try {
                  // Llamada al backend para actualizar el estado de la tarea
                  const response = await fetch(`${apiUrl}api/tasks/${task.id}/status`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                  });

                  console.log(response)

                  if (!response.ok) {
                    throw new Error("Failed to update status");
                  }

                  console.log("Task status updated to:", newStatus);
                  window.location.reload()
                  // Opcional: Actualizar el estado local del componente o mostrar una notificación
                } catch (error) {
                  console.error("Error updating task status:", error);
                }
              }}
            >
              {statusOptions.map((status, index) => (
                <DropdownMenuRadioItem key={index} value={status}>
                  {status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Edit Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={task.priority}
              onValueChange={async (newPriority) => {
                try {
                  // Llamada al backend para actualizar el estado de la tarea
                  const response = await fetch(`${apiUrl}api/tasks/${task.id}/priority`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ priority: newPriority }),
                  });

                  console.log(response)

                  if (!response.ok) {
                    throw new Error("Failed to update status");
                  }

                  console.log("Task status updated to:", newPriority);
                  window.location.reload()
                  // Opcional: Actualizar el estado local del componente o mostrar una notificación
                } catch (error) {
                  console.error("Error updating task status:", error);
                }
              }}
            >
              {priorityOptions.map((priority, index) => (
                <DropdownMenuRadioItem key={index} value={priority}>
                  {priority}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconTrash size={20} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}