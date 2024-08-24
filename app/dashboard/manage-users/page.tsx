import LayoutSelector from "@/components/custom/LayoutSelector";
import React from "react";
import { UserView } from "./userView";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUsers } from "@/lib/fetch";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import CreateUserForm from "./CreateUserForm";

const ManageUsers = async () => {

  const users = await fetchUsers();

  return (
    <main>
      <LayoutSelector layout="default">
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col gap-6 overflow-y-auto p-4">
          <div className="flex flex-row justify-between pr-8">
            <h1 className="text-4xl font-bold mb-4">USERS</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <IconPlus className="p-0" height={17} />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new User</DialogTitle>
                  <DialogClose asChild >
                    <CreateUserForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex justify-center">
            <UserView users={users} />
          </div>
        </section>
      </LayoutSelector>
    </main>
  );
};

export default ManageUsers;
