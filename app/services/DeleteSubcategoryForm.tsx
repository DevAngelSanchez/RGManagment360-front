"use client"

import React, { useState, FC } from "react";
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

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { IconTrash } from "@tabler/icons-react";
import { DeleteSubcategory } from "./actions";
import AlertComponent from "@/components/custom/alert";

const formSchema = z.object({
  id: z.number(),
  name: z.string()
});

interface Props {
  id: number;
  name: string;
}

export const DeleteSubcategoryForm: FC<Props> = ({ id, name }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      name
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await DeleteSubcategory(id);
      setIsLoading(false);
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
      setAlert({ title: "Error!", description: "Error trying to update this Subcategory", type: "error", show: true });
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
              <FormLabel>Subcategory Name</FormLabel>
              <FormControl>
                <Input placeholder="John" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="destructive" className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            <>
              <IconTrash size={24} className="mr-1" />
              <span>Delete</span>
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
