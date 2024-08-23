"use client";
import React, { FC } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { apiUrl } from "@/auth";
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
import { Button } from "@/components/ui/button";

type TCategory = {
  name: string;
  id: string;
};

const formSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
});

export const EditFormCategory: FC<TCategory> = ({ id, name }) => {
  console.log(id, name, 1111);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await fetch(`${apiUrl}api/categories/update-category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: values?.category,
        }),
      });
      console.log(await result);

      if (!result.ok) {
        console.log("Error trying to create a new category");
        return null;
      } else {
        router.push("/services");
        console.log("categoria creada", values.category);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: name,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insert a new name for the selected category"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Once yo submit the category name will be change
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  placeholder="Insert a new name for the selected category"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditFormCategory;
