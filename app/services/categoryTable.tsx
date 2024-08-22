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

const categoryList = [
  {
    categoryName: "Gardening",
  },
  {
    categoryName: "Electricity",
  },
  {
    categoryName: "Plumbing",
  },
];

export function CategoryTable() {
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
              {categoryList.map((value, index) => (
                <TableRow key={index}>
                  <TableCell className="font-bold text-base">
                    {value.categoryName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {categoryList.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
