import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconTrash, IconEdit } from "@tabler/icons-react";

//empieza la tabla
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const userList = [
  {
    userName: "INV001",
    firstName: "Jack",
    lastName: "Smith",
    email: "jsmith@gmail.com",
    address: "Miami",
    phoneNumber: "+1 555 55 55",
    role: "Manager",
  },
  {
    userName: "INV002",
    firstName: "Sophia",
    lastName: "Black",
    email: "sophia@gmail.com",
    address: "New York",
    phoneNumber: "+1 555 55 55",
    role: "Customer",
  },
  {
    userName: "INV003",
    firstName: "Mike",
    lastName: "Montana",
    email: "MM@gmail.com",
    address: "Philadelphia",
    phoneNumber: "+1 555 55 55",
    role: "Service Provider",
  },
  {
    userName: "INV004",
    firstName: "John",
    lastName: "Carter",
    email: "johnc50@outlock.com",
    address: "New York",
    phoneNumber: "+1 555 55 55",
    role: "Assistant",
  },
  {
    userName: "INV005",
    firstName: "David",
    lastName: "Brown",
    email: "dbrown44@yahoo.com",
    address: "Texas",
    phoneNumber: "+1 555 55 55",
    role: "Customer",
  },
  {
    userName: "INV006",
    firstName: "Joe",
    lastName: "Miller",
    email: "j-miller-01@gmail.com",
    address: "Arizona",
    phoneNumber: "+1 555 55 55",
    role: "Customer",
  },
  {
    userName: "INV007",
    firstName: "Andrew",
    lastName: "Wilson",
    email: "and_will@outlock.com",
    address: "LA",
    phoneNumber: "+1 555 55 55",
    role: "Service Provider",
  },
];

export function UserView() {
  return (
    <Card className="w-3/4">
      <CardHeader className="bg-green-200 rounded-t-md">
        <CardTitle>User List</CardTitle>
        <CardDescription>
          This is a list of the registered users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/*se renderiza la tabla*/}
        <Table>
          {/*  <TableCaption>A list of your users.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">User</TableHead> */}
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Accions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((value) => (
              <TableRow key={value.userName}>
               <TableCell className="font-medium flex">
                   {value.userName}
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{value.firstName}</TableCell>
                <TableCell>{value.lastName}</TableCell>
                <TableCell>{value.email}</TableCell>
                <TableCell>{value.address}</TableCell>
                <TableCell>{value.phoneNumber}</TableCell>
                <TableCell>{value.role}</TableCell>
                <TableCell>
                  <div className="flex justify-between items-center">
                    <Button variant="secondary" className="w-8 h-8 p-0">
                      <IconEdit className="p-0" height={17} />
                    </Button>
                    <Button variant="destructive" className="w-8 h-8 p-0">
                      <IconTrash className="p-0" height={17} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total users</TableCell>
              <TableCell className="text-right">
                {userList.length} Users
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
