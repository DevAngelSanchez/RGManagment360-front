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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { DeletePropertyForm } from "./deleteForm";
import { EditPropertyForm } from "./editForm";

export interface User {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
}

export interface Property {
  id: number;
  name: string;
  owner?: User;
  ownerId?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
  inventory?: [];
  tasks?: [];
}

type PropertiesTableProps = {
  properties: Property[];
}

export const PropertiesTable: React.FC<PropertiesTableProps> = ({ properties }) => {
  return (
    <Card className="w-full">
      <CardHeader className="bg-green-200 rounded-t-md">
        <CardTitle>Properties List</CardTitle>
        <CardDescription>
          This is a list of the registered properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/*se renderiza la tabla*/}
        <Table>
          {/*  <TableCaption>A list of your users.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-[100px]">User</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Postal Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties && properties.map((value) => (
              <TableRow key={value.id}>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.owner?.name}</TableCell>
                <TableCell>{value.phone}</TableCell>
                <TableCell>{value.address}</TableCell>
                <TableCell>{value.city}</TableCell>
                <TableCell>{value.state}</TableCell>
                <TableCell>{value.zipPostalCode}</TableCell>
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
                          <DialogTitle>Edit Property?</DialogTitle>
                          <DialogDescription>
                            Make the changes that you want to this property
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                          <EditPropertyForm property={value} />
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-8 h-8 p-0">
                          <IconTrash className="p-0" height={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Property?</DialogTitle>
                          <DialogDescription>
                            Are you sure do you want to delete this property?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                          <DeletePropertyForm id={value.id} name={value.name} />
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total properties</TableCell>
              <TableCell className="text-right">
                {properties.length} Properties
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
