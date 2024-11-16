import React, { FC } from "react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EdirFormCategory from "./EditFormCategory";
import { DeleteCategoryForm } from "./DeleteCategory";
import { Category } from "@/lib/types";


export const TaskTable: FC = () => {
  return (
    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-10 justify-between w-full">
      <Card className="">
        <CardHeader>
          <CardTitle className="mb-2 ">Incidences</CardTitle>
          <CardDescription>
            This is a list of all the pending tasks related to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-base">
                  Task ID
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Service
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Location
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {task.id}
                  </TableCell>
                  <TableCell>{task.service}</TableCell>
                  <TableCell>{task.location}</TableCell>
                  <TableCell >
                    {task.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{tasks.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="mb-2 ">Incidences</CardTitle>
          <CardDescription>
            This is a list of all the pending tasks related to your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-base">
                  Task ID
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Service
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Location
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {task.id}
                  </TableCell>
                  <TableCell>{task.service}</TableCell>
                  <TableCell>{task.location}</TableCell>
                  <TableCell >
                    {task.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">{tasks.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
