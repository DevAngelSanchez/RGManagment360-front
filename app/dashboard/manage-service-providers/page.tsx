import LayoutSelector from "@/components/custom/LayoutSelector";

import ServiceProvidersUI from "./serviceProvidersUI";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

import { IconPlus } from "@tabler/icons-react";
import { CreateServiceProviderForm } from "./form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ManageSuppliers() {

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="flex flex-col overflow-y-auto p-4 bg-slate-50 w-full">
          <div className="flex items-center justify-between w-full gap-2 mb-6">
            <h1 className="text-4xl font-bold mb-4">Service Providers</h1>
            <Dialog>
              <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                <IconPlus size={24} />
                Create Provider
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Provider</DialogTitle>
                  <DialogDescription>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint nihil aperiam nostrum eos molestias ipsa vero.
                  </DialogDescription>
                  <DialogClose asChild >
                    <CreateServiceProviderForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Suspense fallback={<Skeleton />}>
            <ServiceProvidersUI />
          </Suspense>
        </section>
      </main>
    </LayoutSelector>
  )
}
