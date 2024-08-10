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
import { signIn } from "next-auth/react";

type specialField = "electricity" | "gardening" | "plumbing";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Not valid email",
    })
    .trim(),
  password: z.string().trim(),
});

export default function UserForm() {
  const router = useRouter();
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [specialFieldSelected, setSpecialFieldSelected] =
    useState<specialField>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn("credentials", {
      redirect: false,
      email: values?.email,
      password: values?.password,
    });

    if (result?.error) {
      console.log("Error al iniciar sesion, verifique sus credenciales");
      return null;
    } else {
      router.push("/dashboard");
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
        className="space-y-4 min-w-[360px]"
      >
        {/* input first name y last name */}
        <div className="flex flex-row justify-between w-full mb-6">
          <FormItem className=" w-6/12">
            <div className="grid w-3/4  items-center gap-1.5">
              <Label>First Name</Label>
              <Input type="text" id="firstName" placeholder="First Name" />
            </div>
            <FormMessage />
          </FormItem>

          <FormItem className=" w-6/12">
            <div className="grid w-3/4  items-center gap-1.5">
              <Label>Last Name</Label>
              <Input type="text" id="firstName" placeholder="Last Name" />
            </div>
            <FormMessage />
          </FormItem>
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

        <div className="flex flex-row justify-between w-full items-end">
          <FormItem className=" w-6/12">
            <div className="grid w-3/4  items-center gap-1.5">
              <Label>Address</Label>
              <Input type="text" id="address" placeholder="Address" />
            </div>
            <FormMessage />
          </FormItem>

          <FormItem className=" w-6/12">
            <div className="grid w-3/4  items-center gap-1.5">
              <Label>Phone Number</Label>
              <Input type="text" id="phoneNumber" placeholder="Phone Number" />
            </div>
            <FormMessage />
          </FormItem>
          <FormItem className=" w-6/12 ">
            <div className="grid w-3/4  items-center gap-1.5 ">
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-3/4">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="serviceProvider">
                    Service Provider
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        </div>
        {isProvider && (
          <div className="flex flex-row justify-between w-full mb-6 pt-7">
            <FormItem className=" w-6/12">
              <div className="grid w-3/4  items-center gap-1.5">
                <Label>Department</Label>
                <Select onValueChange={handleSelectService}>
                  <SelectTrigger className="w-3/4">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="gardening">Gardening</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>

            {specialFieldSelected === "electricity" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Electricity </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lights">Lights</SelectItem>
                      <SelectItem value="appliances">Appliances</SelectItem>
                      <SelectItem value="high voltage">High voltage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "gardening" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Gardening </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plantWatering">
                        Plant watering
                      </SelectItem>
                      <SelectItem value="cutDownPlants">
                        Cut down plants
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "plumbing" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Plumbing </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bathrooms">Bathrooms</SelectItem>
                      <SelectItem value="leaks">Leaks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "gardening" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Gardening </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plantWatering">
                        Plant watering
                      </SelectItem>
                      <SelectItem value="cutDownPlants">
                        Cut down plants
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : null}
          </div>
        )}
        <div className="w-full flex justify-end">
          <Button className="md:w-32 sm:w-full" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
