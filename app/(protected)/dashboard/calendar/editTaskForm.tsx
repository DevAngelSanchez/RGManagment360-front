"use client"

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth.config";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import AlertComponent from "@/components/custom/alert";
import { Category, Property, Subcategory, Task, User } from "@/lib/types";

import { fetchCategories, fetchProperties, fetchServiceProviders, fetchSubcategories } from "@/lib/fetch";
import { Textarea } from "@/components/ui/textarea";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MainDatePicker } from "@/components/custom/DatePicker";
import { SubcategoryType } from "../../service-provider/tasks/data/schema";

dayjs.extend(customParseFormat);

const formSchema = z.object({
  name: z.string().min(3, {
    message: "The name must have more than 3 characters"
  }).trim(),
  categoryId: z.string().trim(),
  subcategoryId: z.string().trim(),
  priority: z.string({
    message: 'Select a priority'
  }),
  propertyId: z.string({
    message: "Select a property"
  }),
  status: z.string({
    message: 'Select a status'
  }),
  taskProviderId: z.string({
    message: 'Select a Service Provider'
  }),
  observations: z.string().trim()
});

interface Props {
  accessToken: string;
  selectedDate?: Date;
  task?: Task;
}


export function EditTaskForm({ accessToken, selectedDate, task }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<SubcategoryType[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [providers, setProviders] = useState<User[]>([]);
  const [priorities, setPriorities] = useState<string[]>(["low", "medium", "high"]);
  const [status, setStatus] = useState<string[]>(["todo", "in progress", "done", "canceled"]);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  const [day, setDay] = useState<Date | undefined>(() => {
    // Si 'datetimeAssigment' existe, tomamos esa fecha, si no, usamos una fecha por defecto (new Date)
    return task?.datetimeAssigment ? new Date(task.datetimeAssigment) : new Date();
  });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  const handleCategoryChange = (name: string, value: string) => {
    const selectedCategoryId = value;

    const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCategoryId));

    if (selectedCategory) {
      setFilteredSubcategories(selectedCategory.subcategories);
    } else {
      setFilteredSubcategories(subcategories);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const responseCategories = await fetchCategories();
      const responseSubcategories = await fetchSubcategories();
      const responseProperties = await fetchProperties();
      const responseServicesProviders = await fetchServiceProviders();

      if (responseCategories.data) {
        setCategories(responseCategories.data)
      }
      if (responseSubcategories.data) {
        setSubcategories(responseSubcategories.data)
        setFilteredSubcategories(responseSubcategories.data);
      }
      if (responseProperties.data) {
        setProperties(responseProperties.data);
      }
      if (responseServicesProviders.data) {
        setProviders(responseServicesProviders.data);
      }
    }

    getData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: task?.name || "",
      categoryId: task?.categoryId?.toString() || "",
      subcategoryId: task?.subcategoryId?.toString() || "",
      priority: task?.priority || "",
      propertyId: task?.propertyId?.toString() || "",
      status: task?.status || "",
      taskProviderId: task?.taskProviderId?.toString() || "",
      observations: task?.observations || ""
    },
  });

  const handleDateChange = (selectedDay: Date | undefined) => {
    setDay(selectedDay);
  };

  const combineDateAndTime = (day: Date, time: string | string[]) => {
    return dayjs(day).format('YYYY-MM-DD') + 'T' + time;
  };

  const handleDeleteTask = async (taskId: number) => {
    const response = await fetch(`${apiUrl}api/delete-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId, accessToken }),
    });

    if (response.ok) {
      setAlert({ title: "Success", description: "Task deleted successfully.", type: "success", show: true });
      setTimeout(() => {
        resetAlert();
        // router.refresh();
        window.location.reload();

      }, 3000)
    } else {
      setAlert({ title: "Error", description: "Could not delete the task.", type: "error", show: true });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { name, categoryId, subcategoryId, priority, propertyId, status, taskProviderId, observations } = values;

    if (!day) {
      resetAlert();
      setAlert({ title: "Please select a day!", description: "You don't have selected any day.", type: "error", show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      return null;
    }

    const startTime = "00:00";
    const endTime = "23:59";

    try {
      setIsLoading(true);

      const response = await fetch(`${apiUrl}api/update-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taskId: task?.id,
          name,
          categoryId: Number(categoryId),
          subcategoryId: Number(subcategoryId),
          priority,
          propertyId: Number(propertyId),
          status,
          taskProviderId: Number(taskProviderId),
          datetimeAssigment: dayjs(day).format('YYYY-MM-DD') + 'T' + startTime,
          datetimeEnd: dayjs(day).format('YYYY-MM-DD') + 'T' + endTime,
          observations,
          accessToken
        })
      });
      setIsLoading(false);

      if (!response.ok) {
        resetAlert();
        setAlert({ title: "Error", description: "There was a problem updating the task.", type: "error", show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }

      const result = await response.json();

      if (result.type === "error") {
        resetAlert();
        setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }

      resetAlert();

      setAlert({ title: result.title, description: result.msg, type: result.type, show: true });

      setTimeout(() => {
        resetAlert();
      }, 3000);

      // router.refresh();
      window.location.reload();
    } catch (error) {
      resetAlert();

      setAlert({ title: "Error!", description: "Error trying to update the task", type: "error", show: true });

      setTimeout(() => {
        resetAlert()
      }, 3000);

      return;
    }
  }

  return (
    <Form {...form}>
      {task && (

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task name</FormLabel>
                    <FormControl>
                      <Input placeholder="Task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Select Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Property" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {properties && properties.map(item => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Select a Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // Update field with the category name
                          handleCategoryChange("category", value);
                        }}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories && categories.map(item => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="subcategoryId"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Select a subcategory</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSubcategories && filteredSubcategories.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities && priorities.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status && status.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="taskProviderId"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {providers && providers.map(item => (
                            <SelectItem key={item?.id} value={item.id.toString() || "Invalid ID"}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Day</FormLabel>
                  <MainDatePicker selectedDate={day} onChange={handleDateChange} />
                </FormItem>
              </div>
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional task details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
              ) : (
                <>
                  <IconEdit size={24} className="mr-2" />
                  <span>Edit Task</span>
                </>
              )}
            </Button>

            <React.Fragment>
              <div> -------- Or -------- </div>

              <Button className="w-full" type="button" disabled={isLoading} variant="destructive" onClick={(e) => {
                handleDeleteTask(task?.id)
              }}>
                {isLoading ? (
                  <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
                ) : (
                  <>
                    <IconTrash size={24} className="mr-2" />
                    <span>Delete Task</span>
                  </>
                )}
              </Button>
            </React.Fragment>
          </div>
        </form >
      )}

      {
        alert.show && (
          <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
        )
      }
    </Form >
  )
}
