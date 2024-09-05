"use client"

import React, { useState, useEffect, FC } from "react";
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
import { apiUrl } from "@/auth";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { DeleteProperty } from "./actions";
import AlertComponent from "@/components/custom/alert";

const formSchema = z.object({
  id: z.number(),
  name: z.string()
});

interface DeletePropertyFormProps {
  id: number;
  name: string;
}

export const DeletePropertyForm: FC<DeletePropertyFormProps> = ({ id, name }) => {
  const router = useRouter();

  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      name,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const result = await DeleteProperty(values.id);
    try {
      const result = await DeleteProperty(values.id);
      if (result.type === "error") {
        resetAlert();
        setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }
      setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      router.refresh();
    } catch (error) {
      resetAlert();
      setAlert({ title: "Error!", description: "Error trying to delete this property", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 3000);
      console.log(error);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="opacity-0 hidden">
              <FormLabel></FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="John" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="destructive" type="submit">
          <IconTrash size={16} className="mr-2" />
          Delete
        </Button>
      </form >

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form >
  )
}
