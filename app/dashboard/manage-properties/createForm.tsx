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
import { IconPlus } from "@tabler/icons-react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  isActive: string;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "The property name must have more than 3 characters"
  }).trim(),
  address: z.string().min(3, {
    message: "The property address must have more than 3 characters"
  }).trim(),
  phone: z.string().min(7, {
    message: "The phone field must have more than 7 characters"
  }).regex(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/, {
    message: "This is not a format valid"
  }).trim(),
  city: z.string().min(2, {
    message: "The property city field must have more than 2 characters"
  }),
  state: z.string().min(2, {
    message: "The property state field must have more than 2 characters"
  }),
  zipPostalCode: z.string().min(2, {
    message: "The property postal code field must have more than 2 characters"
  }),
  ownerId: z.string({
    message: ""
  })
});

export function CreatePropertyForm() {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`${apiUrl}api/users/by-role/CUSTOMER`);
      if (!response.ok) {
        alert("Error trying to get Customers");
        return
      }
      const data = await response.json();
      setCustomers(data);
    }

    fetchCustomers();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      city: "",
      state: "",
      zipPostalCode: "",
      ownerId: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const result = await fetch(`${apiUrl}api/properties/create-property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: values?.name,
        address: values?.address,
        phone: values?.phone,
        city: values?.city,
        state: values?.state,
        zipPostalCode: values?.zipPostalCode,
        ownerId: Number(values?.ownerId)
      })
    });

    if (!result.ok) {
      alert("Error trying to create this property");
      return;
    }

    const data = await result.json();
    router.push("/dashboard/manage-properties");
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
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
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="street name or number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Miami" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Florida" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipPostalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code (ZIP)</FormLabel>
              <FormControl>
                <Input type="text" placeholder="123312" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="w-full">
            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Owner</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers && customers.map((customer, index) => (
                        <SelectItem key={index} textValue={customer.name} value={customer.id?.toString()}>
                          {customer.name}
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="+188844444" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        < Button className="w-full" type="submit" >
          <IconPlus size={24} />
          Add property
        </Button >
      </form >
    </Form >
  )
}
