"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { apiUrl } from "@/auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Not valid email",
  }).trim(),
  password: z.string().trim(),
})

export function LoginForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(`${apiUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values?.email,
          password: values?.password
        })
      });

      if (!response.ok) {
        console.log(`Error al iniciar sesion. Status Error: ${response.status}`);
        return null;
      }

      await response.json();
      router.push('/dashboard');

    } catch (error) {
      console.log("Hubo un error al iniciar sesion", error);
      return null;
    }
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
        < Button className="w-full" type="submit" >Login</Button >
      </form >
    </Form >
  )
}
