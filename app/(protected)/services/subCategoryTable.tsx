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
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import EditFormSubCategory from "./EditFormSubCategory";
import { fetchCategories } from "@/lib/fetch";
import { DeleteSubcategoryForm } from "./DeleteSubcategoryForm";
import { Category, Subcategory } from "@/lib/types";

type TSubcategory = {
  categories: Category[] | null;
  subcategories: Subcategory[] | null;
};

export const SubCategoryTable: FC<TSubcategory> = async ({ categories, subcategories }) => {

  return (
    <div>
      <Card>
        <CardHeader className="items-start flex flex-col">
          <CardTitle className="mb-2 ">Subcategory table</CardTitle>
          <CardDescription>
            This is a list of all the subcategories available at the moment, You
            can always create new ones!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-semibold text-base">
                  Subcategory name
                </TableHead>
                <TableHead className="w-[200px] font-semibold text-base">
                  Category associated
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subcategories &&
                subcategories.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold text-base">
                      {value.name}
                    </TableCell>
                    <TableCell className="font-bold text-base">
                      {value.mayorCategory.name}
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
                              <DialogTitle>Edit Subcategory</DialogTitle>
                              <DialogDescription>Are you sure that you want to delete this category?</DialogDescription>
                              <DialogClose asChild >
                                <EditFormSubCategory categories={categories} subcategory={value} />
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
                              <DialogTitle>Delete Subcategory</DialogTitle>
                              <DialogClose asChild >
                                <DeleteSubcategoryForm id={Number(value.id)} name={value.name} />
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
                  {subcategories && subcategories.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
