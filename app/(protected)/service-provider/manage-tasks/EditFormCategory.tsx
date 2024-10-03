"use client";
import React, { FC, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditCategory } from "./actions";
import AlertComponent from "@/components/custom/alert";
import { IconEdit } from "@tabler/icons-react";

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
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await EditCategory(Number(id), values.category);
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
      setAlert({ title: "Error!", description: "Error trying to edit this Category", type: "error", show: true });
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
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            <>
              <IconEdit size={24} />
              <span>Update Category</span>
            </>
          )}
        </Button>
      </form>

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form>
  );
};

export default EditFormCategory;
