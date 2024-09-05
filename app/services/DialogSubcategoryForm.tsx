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
import { Category } from "@/lib/types";
import { CreateSubcategory } from "./actions";
import AlertComponent from "@/components/custom/alert";

// interface ISubcategory {
//   name: string;
//   id: number;
// }
type TSubcategoryProps = {
  category: Category[] | null;
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
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const result = await CreateSubcategory(values.subcategory, values.categoryId);
      console.log(result)
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
      setAlert({ title: "Error!", description: "Error trying to create a new Subcategory", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 3000);
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

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form>
  );
};

export default DialogSubcategoryForm;
