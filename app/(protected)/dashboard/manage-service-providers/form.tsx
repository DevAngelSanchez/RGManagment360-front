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
import { IconUserPlus } from "@tabler/icons-react";
import { CreateServiceProvider } from "./actions";
import AlertComponent from "@/components/custom/alert";

import { Category, Subcategory } from "@/lib/types";
import { fetchCategories, fetchSubcategories } from "@/lib/fetch";
import { SubcategoryType } from "../../service-provider/tasks/data/schema";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Minimun 3 characters"
  }).trim(),
  companyName: z.string().min(3, {
    message: "Minimun 3 characters"
  }).trim(),
  category: z.string({
    message: 'Select a category'
  }),
  subcategories: z.array(z.string()).min(1, "You must select at least one subcategory"),
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
  const [subcategories, setSubcategories] = useState<SubcategoryType[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<SubcategoryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  const handleCategoryChange = (name: string, value: string) => {
    const selectedCategoryId = value;

    // Filtrar las subcategorías basadas en la categoría seleccionada
    const selectedCategory = categories.find(cat => cat.id === parseInt(selectedCategoryId));

    if (selectedCategory) {
      setFilteredSubcategories(selectedCategory.subcategories);
    } else {
      setFilteredSubcategories(subcategories);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const responseCategories = await fetchCategories();
      const responseSubcategories = await fetchSubcategories();

      if (responseCategories.data) {
        setCategories(responseCategories.data)
      }
      if (responseSubcategories.data) {
        setSubcategories(responseSubcategories.data)
        setFilteredSubcategories(responseSubcategories.data);
      }
    }

    getData();
  }, [])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      companyName: "",
      category: "",
      subcategories: [],
      address: "",
      email: "",
      phone: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { fullname, companyName, email, password, phone, address, category, subcategories } = values;

    try {
      setIsLoading(true);
      const result = await CreateServiceProvider(fullname, companyName, email, password, phone, address, category, subcategories);
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
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="My company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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
                    <Select
                      onValueChange={(value) => {
                        const selectedCategory = JSON.parse(value);
                        field.onChange(selectedCategory.name); // Update field with the category name
                        handleCategoryChange("category", selectedCategory.id);
                      }}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories && categories.map(item => (
                          <SelectItem key={item.id} value={JSON.stringify({ name: item.name, id: item.id })}>
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
                name="subcategories" // Debe coincidir con el tipo definido en FormValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategories</FormLabel>
                    <Select
                      // Maneja la lógica para agregar o quitar valores
                      onValueChange={(value) => {
                        const currentValues = field.value || [];
                        const newValues = currentValues.includes(value)
                          ? currentValues.filter((item) => item !== value) // Remueve si ya está seleccionado
                          : [...currentValues, value]; // Agrega si no está seleccionado
                        field.onChange(newValues); // Actualiza el array
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>
                            {field.value?.length
                              ? field.value.join(", ") // Muestra los valores seleccionados separados por comas
                              : "Select subcategories"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredSubcategories &&
                          filteredSubcategories.map((item) => (
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
