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

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth";
import { IconTrash } from "@tabler/icons-react";

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

    const result = await fetch(`${apiUrl}api/subcategories/delete-subcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: values?.id,
      })
    });

    if (!result.ok) {
      alert("Error trying to delete this category");
      return;
    }

    await result.json();
    router.push("/services");
    return;
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
        <Button variant="destructive" type="submit">
          <IconTrash size={16} className="mr-2" />
          Delete
        </Button>
      </form >
    </Form >
  )
}
