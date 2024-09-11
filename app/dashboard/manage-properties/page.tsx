import LayoutSelector from "@/components/custom/LayoutSelector";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react";

import PropertiesUI from "./propertiesUI";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {CreatePropertyForm} from "./createForm";

export default async function ManageProperties() {

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="flex flex-col overflow-y-auto p-4">
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
          <Suspense fallback={<Skeleton />}>
            <PropertiesUI />
          </Suspense>
        </section>
      </main>
    </LayoutSelector>
  )
}
