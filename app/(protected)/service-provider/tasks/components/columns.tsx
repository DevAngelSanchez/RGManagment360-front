"use client";

import { ColumnDef } from "@tanstack/react-table";

/* import { Badge } from "@/registry/new-york/ui/badge" */
import { Badge } from "@/components/ui/badge";

/* import { Checkbox } from "@/registry/new-york/ui/checkbox" */
import { Checkbox } from "@/components/ui/checkbox";

import { labels, priorities, statuses } from "../data/data";
import { PropertyType, SubcategoryType, Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Category } from "@/lib/types";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditFormSubCategory from "@/app/(protected)/services/EditFormSubCategory";
import { DeleteSubcategoryForm } from "@/app/(protected)/services/DeleteSubcategoryForm";
import EditFormCategory from "@/app/(protected)/services/EditFormCategory";
import { DeleteCategoryForm } from "@/app/(protected)/services/DeleteCategory";
import { EditUserForm } from "@/app/(protected)/dashboard/manage-users/EditUserForm";
import { DeleteUserForm } from "@/app/(protected)/dashboard/manage-users/DeleteUserForm";
import { UserType } from "@/lib/schemas/userSchema";
import { EditPropertyForm } from "@/app/(protected)/dashboard/manage-properties/editForm";
import { DeletePropertyForm } from "@/app/(protected)/dashboard/manage-properties/deleteForm";
import { useCategories } from "@/components/contexts/categoriesContext";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const categories = useCategories(); // Accede a las categorías aquí
      const label = labels.find((label) => label.label === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("provider")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Date" />
    ),
    cell: ({ row }) => {
      const assignedDate = row.getValue("date");

      // Verificamos que assignedDate sea un valor válido
      const formattedDate =
        assignedDate instanceof Date
          ? assignedDate.toLocaleDateString()
          : typeof assignedDate === "string" || typeof assignedDate === "number"
            ? new Date(assignedDate).toLocaleDateString()
            : "N/A";

      return (
        <span className="text-sm text-muted-foreground">
          {formattedDate}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      let statusColor: string = "border-indigo-500/50 ";

      switch (status.value) {
        case "in progress":
          statusColor = "border-yellow-500/50 ";
          break;
        case "done":
          statusColor = "border-green-500/50 ";
          break;
        case "canceled":
          statusColor = "border-red-500/50 ";
          break;
        default:
          statusColor = "border-indigo-500/50 ";
          break;
      }

      return (
        <div className={"flex w-fit max-w-[120px] items-center rounded-full px-2 py-1 border " + statusColor}>
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const categoryColums: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
                  Edit the category
                </DialogTitle>
                <DialogDescription>
                  Fill each field
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <EditFormCategory
                  name={row.original.name}
                  id={row.original.id.toString()}
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
              <DialogDescription>Are you sure that you want to edit this category?</DialogDescription>

              <DialogClose asChild >
                <DeleteCategoryForm id={Number(row.original.id)} name={row.original.name} />
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

export const subcategoryColumns: ColumnDef<SubcategoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    id: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    // Filtro y celda personalizada para manejar el campo anidado
    accessorFn: (row) => row.mayorCategory?.name || "Sin categoría",
    cell: ({ row }) => {
      const categoryName = row.original.mayorCategory?.name || "Sin categoría";
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {categoryName}
          </span>
        </div>
      );
    },
    // Define el filtro personalizado
    filterFn: (row, columnId, filterValue) => {
      const categoryName = row.getValue(columnId) as string;

      // Si filterValue es un array, verifica si categoryName está incluido en él
      if (Array.isArray(filterValue) && filterValue.length > 0) {
        return filterValue.some(value =>
          categoryName.trim().toLowerCase().includes(value.trim().toLowerCase())
        );
      }

      // Si filterValue no es un array o está vacío, retorna false
      return false;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
              <DialogClose asChild >
                <EditFormSubCategory subcategory={{
                  id: row.original.id,
                  name: row.original.name,
                  users: row.original.users, // Asegúrate de que 'users' está presente
                  category: row.original.category,
                  mayorCategory: row.original.mayorCategory,
                }} />
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
              <DialogDescription>Are you sure that you want to delete this subcategory?</DialogDescription>

              <DialogClose asChild >
                <DeleteSubcategoryForm id={Number(row.original.id)} name={row.original.name} />
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

export const usersColumns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fullname")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("address")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("phone")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("role")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "statusAccount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("statusAccount")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail verified" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("emailVerified") ? "Yes" : "No"}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
                <EditUserForm user={{
                  id: row.original.id,
                  fullname: row.original.fullname,
                  email: row.original.email,
                  role: row.original.role,
                  isActive: row.original.isActive,
                  address: row.original.address,
                  statusAccount: row.original.statusAccount,
                  emailVerified: row.original.emailVerified,
                }} />
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
                  id={Number(row.original.id)}
                  name={row.original.fullname}
                />
              </DialogClose>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

export const propertiesColumns: ColumnDef<PropertyType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("address")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("phone")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("city")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("state")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "zipPostalCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Postal Code" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("zipPostalCode")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ownerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("ownerId")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-between items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-8 h-8 p-0">
              <IconEdit className="p-0" height={17} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
              <DialogDescription>
                Make the changes that you want to this property
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <EditPropertyForm property={{
                id: row.original.id,
                name: row.original.name,
                address: row.original.address,
                phone: row.original.phone,
                city: row.original.city,
                state: row.original.state,
                zipPostalCode: row.original.zipPostalCode,
                ownerId: row.original.ownerId,
              }} />
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
              <DeletePropertyForm
                id={Number(row.original.id)}
                name={row.original.name}
              />
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

