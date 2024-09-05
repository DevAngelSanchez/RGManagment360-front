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
import { DeleteUserForm } from "./DeleteUserForm";
import { EditUserForm } from "./EditUserForm";
import { User } from "@/lib/types";
import { fetchUsers } from "@/lib/fetch";

export async function UserView() {

  const usersResult = await fetchUsers();
  const users: User[] = usersResult.data || [];

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full">
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
                {users &&
                  users.map((value) => (
                    <TableRow key={value.id}>
                      <TableCell>{value.name}</TableCell>
                      <TableCell>{value.lastname}</TableCell>
                      <TableCell>{value.username}</TableCell>
                      <TableCell>{value.email}</TableCell>
                      <TableCell>{value.address}</TableCell>
                      <TableCell>{value.phone}</TableCell>
                      <TableCell>{value.role}</TableCell>
                      <TableCell>{value.isActive}</TableCell>
                      <TableCell>
                        <div className="flex justify-between items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="secondary"
                                className="w-8 h-8 p-0"
                              >
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
                                  Are you sure that you want to delete this
                                  user?
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
    </>
  );
};
