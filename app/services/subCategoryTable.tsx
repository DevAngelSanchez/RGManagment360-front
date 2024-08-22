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

const subCategoryList = [
  {
    subCategoryName: "Leaks",
    categoryAssociated: "Plumbing",
  },
  {
    subCategoryName: "High voltage",
    categoryAssociated: "Electricity",
  },
  {
    subCategoryName: "Pools",
    categoryAssociated: "Plumbing",
  },
  {
    subCategoryName: "Planting",
    categoryAssociated: "Gardening",
  },
  {
    subCategoryName: "White goods",
    categoryAssociated: "Electricity",
  },
];

export function SubCategoryTable() {
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
              {subCategoryList.map((value, index) => (
                <TableRow key={index}>
                  <TableCell className="font-bold text-base">
                    {value.subCategoryName}
                  </TableCell>
                  <TableCell className="font-bold text-base">
                    {value.categoryAssociated}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {subCategoryList.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
