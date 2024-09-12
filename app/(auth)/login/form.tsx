"use client"

import React, { useState, useTransition } from "react";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AlertComponent from "@/components/custom/alert";
import { loginSchema } from "@/lib/zodSchemas";
import { loginAction } from "./action";

export function LoginForm() {
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });

  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    resetAlert();
    startTransition(async () => {
      const response = await loginAction(values);

      if (response?.error) {
        setAlert({ title: "Error!", description: response.error, type: "error", show: true });
        setTimeout(() => {
          resetAlert();
        }, 5000);
      } else {
        router.push('/dashboard');
      }
    });

    // if (result?.error) {
    //   resetAlert();
    //   setAlert({ title: "Something is wrong!", description: "Try to verify your credentials", type: "error", show: true });
    //   setTimeout(() => {
    //     resetAlert();
    //   }, 3000);
    //   return null;
    // } else {
    //   router.push('/dashboard');
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 min-w-[360px]">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="john.doe$2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
          ) : (
            'Login'
          )}
        </Button>
      </form >

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form >
  )
}
