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

interface ICategory {
  name: string;
  id: string;
}

type TCategory = {
  category: ICategory[];
};

export const CategoryTable: FC<TCategory> = ({ category }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="mb-2 ">Category table</CardTitle>
          <CardDescription>
            This is a list of all the categories registered in your account, You
            can always add more!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-base">
                  Category Name
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category &&
                category.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold text-base">
                      {value.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="secondary" className="w-8 h-8 p-0">
                              <IconEdit className="p-0" height={17} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <div className="mb-2">
                                <DialogTitle className="mb-2">
                                  Fill each field
                                </DialogTitle>
                                <DialogDescription>
                                  Edit the category
                                </DialogDescription>
                              </div>
                              <DialogClose asChild>
                                <EdirFormCategory
                                  name={value.name}
                                  id={value.id}
                                />
                              </DialogClose>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" className="w-8 h-8 p-0">
                              <IconTrash className="p-0" height={17} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Category</DialogTitle>
                              <DialogClose asChild >
                                <DeleteCategoryForm id={Number(value.id)} name={value.name} />
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
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {category && category.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
