"use client";
import React, { useState, FC } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/auth";

interface ISubcategory {
  name: string;
  id: number;
}
type TSubcategoryProps = {
  category: ISubcategory[];
};

const formSchema = z.object({
  subcategory: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  categoryId: z.string({
    message: "Select a id",
  }),
});

export const DialogSubcategoryForm: FC<TSubcategoryProps> = ({ category }) => {
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, 22);
    try {
      const result = await fetch(
        `${apiUrl}api/subcategories/create-subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values?.subcategory,
            categoryId: Number(values?.categoryId),
          }),
        }
      );

      if (!result.ok) {
        console.log("Error trying to create a new subcategory");
        return null;
      } else {
        router.push("/services");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subcategory: "",
      categoryId: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <FormControl>
                <Input placeholder="Create a subcategory" {...field} />
              </FormControl>
              <FormDescription>
                This subcategory will be related to a category, you have to
                select it down bellow.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category &&
                      category.map((value, index) => (
                        <SelectItem key={index} value={value.id?.toString()}>
                          {value.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DialogSubcategoryForm;
