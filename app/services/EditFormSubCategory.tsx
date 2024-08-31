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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Category, Subcategory } from "@/lib/types";
import { EditSubcategory } from "./actions";

// interface ISubcategory {
//   id: string;
//   name: string;
//   mayorCategory: {
//     id: number;
//     name: string;
//   }
// };

// interface ICategory {
//   id: string;
//   name: string;
// };

interface EditSubCategoryProps {
  categories: Category[] | null;
  subcategory: Subcategory;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Subcategory must be at least 2 characters.",
  }),
  parentCategoryId: z.string(),
});

export const EditFormSubCategory: FC<EditSubCategoryProps> = ({ categories, subcategory }) => {
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await EditSubcategory(subcategory.id, values.name, values.parentCategoryId);
    router.refresh()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subcategory.name,
      parentCategoryId: subcategory.mayorCategory.id.toString()
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
        <div className="w-full">
          <FormField
            control={form.control}
            name="parentCategoryId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Parent Category</FormLabel>
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
                    {categories &&
                      categories.map((value, index) => (
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

export default EditFormSubCategory;
