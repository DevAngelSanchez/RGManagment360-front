import LayoutSelector from "@/components/custom/LayoutSelector";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { IconPlus } from "@tabler/icons-react";

import { DialogClose } from "@radix-ui/react-dialog";
import { CreatePropertyForm } from '@/app/dashboard/manage-properties/createForm';
import { PropertiesTable } from "./propertiesTable";
import { fetchProperties } from "@/lib/fetch";

export default async function ManageProperties() {

  const properties = await fetchProperties();

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">

          <div className="flex items-center justify-between w-full gap-2 mb-6">
            <h1 className="text-4xl font-bold mb-4">Manage Properties</h1>
            <Dialog>
              <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                <IconPlus size={24} />
                Create Property
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Property</DialogTitle>
                  <DialogDescription>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint nihil aperiam nostrum eos molestias ipsa vero.
                  </DialogDescription>
                  <DialogClose asChild >
                    <CreatePropertyForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full flex flex-col gap-4 mb-6">
            <PropertiesTable properties={properties} />
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}
