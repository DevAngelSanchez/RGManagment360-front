"use client"

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { Category, Property, Subcategory } from "@/lib/types";

import { User } from "@prisma/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MainDatePicker } from "@/components/custom/DatePicker";

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
  day: z.date(),
  datetimeAssigment: z.date(),
  datetimeEnd: z.date(),
  observations: z.string().trim()
});

export function CreateTaskForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [providers, setProviders] = useState<User[]>([]);
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [day, setDay] = useState<Date | null>(null);
  const [priorities, setPriorities] = useState<string[]>(["low", "normal", "high"]);
  const [status, setStatus] = useState<string[]>(["pending", "in progress", "complete"]);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}api/categories/`);
        if (!response) {
          console.log("Not found categories");
          return;
        }

        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.log("Error trying to fetch categories");
        return null;
      }
    }

    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${apiUrl}api/Subcategories/`);
        if (!response) {
          console.log("Not found Subcategories");
          return;
        }

        const subcategories = await response.json();
        setSubcategories(subcategories);
      } catch (error) {
        console.log("Error trying to fetch Subcategories");
        return null;
      }
    }

    const fetchProperties = async () => {
      try {
        const response = await fetch(`${apiUrl}api/properties/`);
        if (!response) {
          console.log("Not found Properties");
          return;
        }

        const properties = await response.json();
        setProperties(properties);
      } catch (error) {
        console.log("Error trying to fetch Properties");
        return null;
      }
    }

    const fetchProviders = async () => {
      try {
        const response = await fetch(`${apiUrl}api/users/by-role/SERVICE_PROVIDER`);
        if (!response) {
          console.log("Not found Providers");
          return;
        }

        const providers = await response.json();
        setProviders(providers);
      } catch (error) {
        console.log("Error trying to fetch Providers");
        return null;
      }
    }

    fetchCategories();
    fetchSubcategories();
    fetchProperties();
    fetchProviders();
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
      observations: ""
    },
  });

  const onChange: TimePickerProps["onChange"] = (time, timeString) => {
    console.log(time, timeString);
  }

  const handleDateChange = (selectedDay: Date) => {
    setDay(selectedDay); // Aquí guardamos el día seleccionado
  };

  const handleStartTimeChange: TimePickerProps["onChange"] = (time, timeString) => {
    setStartTime(timeString); // Guardamos la hora de inicio
  };

  const handleEndTimeChange: TimePickerProps["onChange"] = (time, timeString) => {
    setEndTime(timeString); // Guardamos la hora de fin
  };

  const combineDateAndTime = (day: Date, time: string) => {
    return dayjs(day).format('YYYY-MM-DD') + 'T' + time + ':00'; // Combina el día y hora en formato ISO 8601
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { name, categoryId, subcategoryId, priority, propertyId, status, taskProviderId, datetimeAssigment, datetimeEnd, observations } = values;

    setIsLoading(true)
    console.log(values);
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
        <ScrollArea className="w-full h-[400px] p-3">
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
                          <SelectItem key={item.id} value={item.name}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories && categories.map(item => (
                            <SelectItem key={item.id} value={item.name}>
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
                          {subcategories && subcategories.map(item => (
                            <SelectItem key={item.id} value={item.name}>
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
                            <SelectValue placeholder="Pending" />
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
                            <SelectItem key={item?.id} value={item?.name || "Invalid name"}>
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
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Day</FormLabel>
                      <MainDatePicker />
                    </FormItem>
                  )}
                >

                </FormField>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="datetimeAssigment"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Start time</FormLabel>
                      <FormControl>
                        <TimePicker onChange={onChange} defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="datetimeEnd"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>End time</FormLabel>
                      <FormControl>
                        <TimePicker onChange={onChange} defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

          <ScrollBar />
        </ScrollArea>
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
      </form >

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form >
  )
}
