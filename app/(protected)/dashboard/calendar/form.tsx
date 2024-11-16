"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { IconPlus } from "@tabler/icons-react";
import AlertComponent from "@/components/custom/alert";
import { Category, Property, Task, User } from "@/lib/types";

import {
  fetchCategories,
  fetchProperties,
  fetchServiceProviders,
  fetchSubcategories,
} from "@/lib/fetch";

import { Textarea } from "@/components/ui/textarea";

import type { TimePickerProps } from "antd";
import { TimePicker } from "antd";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MainDatePicker } from "@/components/custom/DatePicker";
import { SubcategoryType } from "../../service-provider/tasks/data/schema";
import { CalendarTest } from "./calendartest";

dayjs.extend(customParseFormat);

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "The name must have more than 3 characters",
    })
    .trim(),
  categoryId: z.string().trim(),
  subcategoryId: z.string().trim(),
  priority: z.string({
    message: "Select a priority",
  }),
  propertyId: z.string({
    message: "Select a property",
  }),
  status: z.string({
    message: "Select a status",
  }),
  taskProviderId: z.string({
    message: "Select a Service Provider",
  }),
  datetimeAssigment: z.date(),
  datetimeEnd: z.date(),
  observations: z.string().trim(),
});

interface Props {
  accessToken: string;
  selectedDate?: Date;
  task?: Task;
}

export function CreateTaskForm({ accessToken, selectedDate }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    SubcategoryType[]
  >([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [providers, setProviders] = useState<User[]>([]);
  const [day, setDay] = useState<Date | undefined>(selectedDate);
  const [priorities, setPriorities] = useState<string[]>([
    "low",
    "medium",
    "high",
  ]);
  const [status, setStatus] = useState<string[]>([
    "todo",
    "in progress",
    "done",
    "canceled",
  ]);
  const [alert, setAlert] = useState({
    title: "",
    description: "",
    type: "default",
    show: false,
  });

  function resetAlert() {
    return setAlert({
      title: "",
      description: "",
      type: "default",
      show: false,
    });
  }

  const handleCategoryChange = (name: string, value: string) => {
    const selectedCategoryId = value;

    // Filtrar las subcategorías basadas en la categoría seleccionada
    const selectedCategory = categories.find(
      (cat) => cat.id === parseInt(selectedCategoryId)
    );

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
        setCategories(responseCategories.data);
      }
      if (responseSubcategories.data) {
        setSubcategories(responseSubcategories.data);
        setFilteredSubcategories(responseSubcategories.data);
      }
      if (responseProperties.data) {
        setProperties(responseProperties.data);
      }
      if (responseServicesProviders.data) {
        setProviders(responseServicesProviders.data);
      }
    };

    getData();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      subcategoryId: "",
      priority: "",
      propertyId: "",
      status: "",
      taskProviderId: "",
      datetimeAssigment: new Date(),
      datetimeEnd: new Date(),
      observations: "",
    },
  });

  const handleDateChange = (selectedDay: Date | undefined) => {
    setDay(selectedDay); // Aquí guardamos el día seleccionado
  };

  const combineDateAndTime = (day: Date, time: string | string[]) => {
    return dayjs(day).format("YYYY-MM-DD") + "T" + time; // Combina el día y hora en formato ISO 8601
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      name,
      categoryId,
      subcategoryId,
      priority,
      propertyId,
      status,
      taskProviderId,
      observations,
    } = values;

    if (!day) {
      resetAlert();
      setAlert({
        title: "Please select a day!",
        description: "You don't have selected any day.",
        type: "error",
        show: true,
      });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      return null;
    }

    const startTime = "00:00";
    const endTime = "23:59";

    try {
      setIsLoading(true);

      const response = await fetch(`${apiUrl}api/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          categoryId: Number(categoryId),
          subcategoryId: Number(subcategoryId),
          priority,
          propertyId: Number(propertyId),
          status,
          taskProviderId: Number(taskProviderId),
          datetimeAssigment: combineDateAndTime(day, startTime),
          datetimeEnd: combineDateAndTime(day, endTime),
          observations,
          accessToken,
        }),
      });
      setIsLoading(false);

      if (!response.ok) {
        resetAlert();
        setAlert({
          title: "Error",
          description: "There was a problem creating the task.",
          type: "error",
          show: true,
        });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }

      const result = await response.json();

      if (result.type === "error") {
        resetAlert();
        setAlert({
          title: result.title,
          description: result.msg,
          type: result.type,
          show: true,
        });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }

      resetAlert();

      setAlert({
        title: result.title,
        description: result.msg,
        type: result.type,
        show: true,
      });

      setTimeout(() => {
        resetAlert();
      }, 3000);

      // router.refresh();
      window.location.reload();
    } catch (error) {
      resetAlert();

      setAlert({
        title: "Error!",
        description: "Error trying to create a new Services Provider",
        type: "error",
        show: true,
      });

      setTimeout(() => {
        resetAlert();
      }, 3000);

      return;
    }
  }

  return (
    <div className="z-0">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 min-w-[360px]"
        >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Property" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {properties &&
                          properties.map((item) => (
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3"></div>
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories &&
                            categories.map((item) => (
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSubcategories &&
                            filteredSubcategories.map((item) => (
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities &&
                            priorities.map((item, index) => (
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status &&
                            status.map((item, index) => (
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {providers &&
                            providers.map((item) => (
                              <SelectItem
                                key={item?.id}
                                value={item.id.toString() || "Invalid ID"}
                              >
                                {item?.fullname}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Day</FormLabel>
                  <div id="datepicker">
                    <MainDatePicker
                      selectedDate={day}
                      onChange={handleDateChange}
                    />
                    {/* <CalendarTest /> */}
                  </div>
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
                      <Textarea
                        placeholder="Additional task details"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
            ) : (
              <>
                <IconPlus size={24} className="mr-2" />
                <span>Add Task</span>
              </>
            )}
          </Button>
        </form>

        {alert.show && (
          <AlertComponent
            title={alert.title}
            msg={alert.description}
            type={alert.type}
            show={true}
          />
        )}
      </Form>
    </div>
  );
}
