"use client";

import React, { useState, useEffect, FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/auth";
import { IconEdit } from "@tabler/icons-react";
import { User } from "@/lib/types";

interface Props {
  user: User;
  id: number;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "The user name must have more than 3 characters",
    })
    .trim(),
  lastname: z
    .string()
    .min(3, {
      message: "The user lastname must have more than 3 characters",
    })
    .trim(),
  username: z
    .string()
    .min(3, {
      message: "The user nickname must have more than 3 characters",
    })
    .trim(),
  email: z
    .string()
    .min(3, {
      message: "The user email must have more than 3 characters",
    })
    .trim(),
  phone: z
    .string()
    .min(3, {
      message: "The user phone must have more than 3 characters",
    })
    .trim(),
  address: z
    .string()
    .min(3, {
      message: "The user address must have more than 3 characters",
    })
    .trim(),
  role: z.string(),
  isActive: z.string(),
});

export const EditUserForm: FC<Props> = ({ user, id }) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      isActive: user.isActive,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await fetch(`${apiUrl}api/users/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name: values?.name,
        lastname: values?.lastname,
        username: values?.username,
        email: values?.email,
        phone: values?.phone,
        address: values?.address,
        role: values?.role,
        isActive: values?.isActive,
      }),
    });

    if (!result.ok) {
      alert("Error trying to update this user");
      return;
    }

    const data = await result.json();
    console.log(data);
    router.push("/dashboard/manage-users");
    return;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-[360px] "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="JohnDoe2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="P. Sherman, wallaby street, 42, sidney"
                  {...field}
                />
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
              name="role"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MANAGER">Manager</SelectItem>
                      <SelectItem value="ASISSTANT">Assistant</SelectItem>
                      <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
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
              name="isActive"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Account Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-2 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disabled" id="disabled" />
                        <Label htmlFor="disabled">Disable</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full" type="submit">
          <IconEdit size={24} />
          Save user
        </Button>
      </form>
    </Form>
  );
};
