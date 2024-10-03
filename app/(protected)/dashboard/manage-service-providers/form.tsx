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
import { IconUserPlus } from "@tabler/icons-react";
import { CreateServiceProvider } from "./actions";
import AlertComponent from "@/components/custom/alert";

interface Category {
  id: number;
  name: string;
}

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Minimun 3 characters"
  }).trim(),
  lastname: z.string().min(2, {
    message: "Minimun 3 characters"
  }).trim(),
  username: z.string().min(3, {
    message: "Minimun 3 characters"
  }).trim(),
  category: z.string({
    message: 'Select a category'
  }),
  subcategory: z.string({
    message: "Select a subcategory"
  }),
  address: z.string().min(3, {
    message: "Minimun 3 characters"
  }).trim(),
  email: z.string().email({
    message: "Invalid e-mail",
  }).trim(),
  phone: z.string().min(7, {
    message: "The phone field must be mora than 7 characters"
  }).regex(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/, {
    message: "Invalid phone number!"
  }).trim(),
  password: z.string().trim(),
});

export function CreateServiceProviderForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    fetchCategories();
    fetchSubcategories();
  }, [])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      username: "",
      category: "",
      subcategory: "",
      address: "",
      email: "",
      phone: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { name, lastname, username, email, password, phone, address, category, subcategory } = values;

    try {
      setIsLoading(true);
      const result = await CreateServiceProvider(name, lastname, username, email, password, phone, address, category, subcategory);
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
      setAlert({ title: "Error!", description: "Error trying to create a new Services Provider", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 10000);
      console.log(error);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
        <div className="max-h-[70vh] overflow-y-auto flex flex-col gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe23" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="P. Sherman, wallaby street, 42, sidney" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="+1 800-555-5555" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="w-full">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories && categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
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
                name="subcategory"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Subcategory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subcategories && subcategories.map(subcategory => (
                          <SelectItem key={subcategory.id} value={subcategory.name}>
                            {subcategory.name}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormDescription>
                  This is a provicional password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            <>
              <IconUserPlus size={24} className="mr-2" />
              <span>Add Service Provider</span>
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
