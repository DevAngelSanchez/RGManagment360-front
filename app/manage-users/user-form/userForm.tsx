"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth";
import React from "react";
import { phoneNumberValidation } from "@/lib/utils";

type specialField = "electricity" | "gardening" | "plumbing";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Invalid name"
  }).trim(),
  lastname: z.string().min(3, {
    message: "Invalid name"
  }).trim(),
  email: z
    .string()
    .email({
      message: "Not valid email",
    })
    .trim(),
  password: z.string().trim(),
  address: z.string().trim(),
  phone: z.string().regex(phoneNumberValidation, {
    message: "Invalid Format"
  }).trim(),
  role: z.string().trim()
});

export default function UserForm() {
  const router = useRouter();
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [specialFieldSelected, setSpecialFieldSelected] =
    useState<specialField>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      role: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const result = await fetch(`${apiUrl}api/users/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: `${values?.name} ${values?.lastname}`,
          email: values?.email,
          password: values?.password,
          address: values?.address,
          phoneNumber: values?.phone,
          role: values?.role
        })
      });

      if (!result.ok) {
        console.log("Error trying to create a new user");
        return null;
      } else {
        router.push("/manage-users");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const handleSelectChange = (selectedValue: string) => {
    setIsProvider(selectedValue === "serviceProvider");
  };
  const handleSelectService = (selectedValue: specialField) => {
    setSpecialFieldSelected(selectedValue);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[360px] max-w-[980px] mx-auto"
      >
        <div className="flex flex-row items-center justify-between w-full mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className=" w-6/12">
                <FormLabel>First name</FormLabel>
                <FormControl className="grid w-3/4  items-center gap-1.5">
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className=" w-6/12">
                <FormLabel>Last name</FormLabel>
                <FormControl className="grid w-3/4  items-center gap-1.5">
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* input email y password */}
        <div className="flex flex-row justify-between w-full mb-6 mt-0">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" w-6/12">
                <FormLabel>Email</FormLabel>
                <FormControl className=" grid w-3/4  items-center gap-1.5">
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className=" w-6/12">
                <FormLabel>Password</FormLabel>
                <FormControl className=" grid w-3/4  items-center gap-1.5">
                  <Input type="password" placeholder="john.doe$2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-center w-full gap-8">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-6/12">
                <FormLabel>Address</FormLabel>
                <FormControl className="">
                  <Input type="text" placeholder="Address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Phone number</FormLabel>
                <FormControl className="">
                  <Input type="text" placeholder="+1 800 555 5555" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMINISTRATOR">Manager</SelectItem>
                    <SelectItem value="ASSISTANT">Assistant</SelectItem>
                    <SelectItem value="CLIENT">Customer</SelectItem>
                    <SelectItem value="SERVICE_PROVIDER">Provider</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button className="md:w-32 sm:w-full" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
