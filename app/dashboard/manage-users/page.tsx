import LayoutSelector from "@/components/custom/LayoutSelector";
import React, { Suspense } from "react";

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
import { Button } from "@/components/ui/button";

import { UserView } from "./userView";
import { Skeleton } from "@/components/ui/skeleton";

const ManageUsers = async () => {

  return (
    <main className="w-full h-full bg-slate-50 ">
      <LayoutSelector layout="default">
        <section className=" p-4 overflow-y-auto">
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
                  <DialogClose asChild>
                    <CreateUserForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Suspense fallback={<Skeleton />}>
            <UserView />
          </Suspense>
        </section>
      </LayoutSelector>
    </main>
  );
};

export default ManageUsers;
