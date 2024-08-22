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

interface ISubcategory {
  name: string;
  categoryId: string;
}

type TSubcategory = {
  subcategories: ISubcategory[];
};

export const SubCategoryTable: FC<TSubcategory> = ({ subcategories }) => {
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
                      {value.categoryId}
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
