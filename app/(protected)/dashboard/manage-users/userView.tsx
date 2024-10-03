"use client"

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrash, IconEdit } from "@tabler/icons-react";

//empieza la tabla
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import { DeleteUserForm } from "./DeleteUserForm";
import { EditUserForm } from "./EditUserForm";
import { User } from "@/lib/types";
import { fetchUsers } from "@/lib/fetch";
import { filterUsersSchema } from "@/lib/zodSchemas";

export function UserView() {

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    lastname: '',
    role: '',
    status: ''
  });

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers();
      if (response.data) {
        setUsers(response.data)
        setFilteredUsers(response.data)
      }
    }
    getUsers();
  }, [])

  const form = useForm<z.infer<typeof filterUsersSchema>>({
    resolver: zodResolver(filterUsersSchema),
    defaultValues: {
      role: "",
      status: "",
      name: "",
      lastname: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = users.filter((user) => {
        return (
          (filters.name === '' || user.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.lastname === '' || user.lastname.toLowerCase().includes(filters.lastname.toLowerCase())) &&
          (filters.role === '' || user.role === filters.role) &&
          (filters.status === '' || (filters.status === 'active' ? user.status === "active" : user.status === "inactive"))
        );
      });
      setFilteredUsers(filtered);
    };

    applyFilters();
  }, [filters, users]);

  function onSubmit(data: z.infer<typeof filterUsersSchema>) { }

  return (
    <div className="flex justify-start">
      <Card className="max-w-[1000px]">
        <div className=" p-4 gap-4 ">
          <h2 className="font-bold text-xl">Filters</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-12 gap-3 w-fit"
            >
              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleInputChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="lastname"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleInputChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleSelectChange("role", value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MANAGER">Manager</SelectItem>
                          <SelectItem value="ASSISTANT">Assistant</SelectItem>
                          <SelectItem value="CUSTOMER">Customer</SelectItem>
                          <SelectItem value="SERVICE_PROVIDER">
                            Service Provider
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-3 col-span-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleSelectChange("status", value)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive ">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <CardHeader className="bg-green-200 rounded-t-md">
          <CardTitle>Users list</CardTitle>
          <CardDescription>
            This is a list of the registered users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Lastname</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Account status</TableHead>
                <TableHead>Accions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers &&
                filteredUsers.map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>{value.name}</TableCell>
                    <TableCell>{value.lastname}</TableCell>
                    <TableCell>{value.username}</TableCell>
                    <TableCell>{value.email}</TableCell>
                    <TableCell>{value.address}</TableCell>
                    <TableCell>{value.phone}</TableCell>
                    <TableCell>{value.role}</TableCell>
                    <TableCell>{value.status}</TableCell>
                    <TableCell>
                      <div className="flex justify-between items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="secondary" className="w-8 h-8 p-0">
                              <IconEdit className="p-0" height={17} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogClose asChild>
                                <EditUserForm user={value} />
                              </DialogClose>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="w-8 h-8 p-0"
                            >
                              <IconTrash className="p-0" height={17} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete User</DialogTitle>
                              <DialogDescription>
                                Are you sure that you want to delete this user?
                              </DialogDescription>
                              <DialogClose asChild>
                                <DeleteUserForm
                                  id={Number(value.id)}
                                  name={value.name}
                                />
                              </DialogClose>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total users</TableCell>
                <TableCell className="text-right">
                  {users.length} Users
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}
