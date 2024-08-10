import { DashboardTable } from "@/components/custom/dashboard/Table";
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

import { CreateSupplierForm } from "./form";
import SuppliersList, { Supplier } from "./SuppliersList";
import { DialogClose } from "@radix-ui/react-dialog";
import { headers } from "next/headers";
import { fetchSuppliers } from "@/lib/fetch";

export default async function ManageSuppliers() {

  let suppliers: Supplier[] = [];
  const headerList = headers()

  suppliers = await fetchSuppliers();

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">

          <div className="flex items-center justify-between w-full gap-2 mb-6">
            <h1 className="text-4xl font-bold mb-4">Suppliers</h1>
            <Dialog>
              <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                <IconPlus size={24} />
                Create Supplier
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Fill each field</DialogTitle>
                  <DialogDescription>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint nihil aperiam nostrum eos molestias ipsa vero.
                  </DialogDescription>
                  <DialogClose asChild >
                    <CreateSupplierForm />
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>

          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="col-span-2">
              <SuppliersList suppliers={suppliers} />
            </div>
            <div className="col-span-3 flex flex-col gap-2 border rounded-lg border-gray-200 shadow-md p-3">
              <h2 className="text-xl font-semibold">Last invoices</h2>
              <DashboardTable />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}
