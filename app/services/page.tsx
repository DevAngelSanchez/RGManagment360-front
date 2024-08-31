import { Suspense } from "react";
import LayoutSelector from "@/components/custom/LayoutSelector";

import ServicesUI from "./serviceUI";
import { Skeleton } from "@/components/ui/skeleton";
import { IconPlus } from "@tabler/icons-react";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DialogCategoryForm from "./DialogCategoryForm";
import DialogSubcategoryForm from "./DialogSubcategoryForm";
import { fetchCategories } from "@/lib/fetch";
import { Category } from "@/lib/types";

export default async function Page() {
  const categoriesResult = await fetchCategories();
  const categories: Category[] = categoriesResult.data || [];

  console.log(categories);

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="bg-slate-50 h-[calc(100vh-5.6rem)] md:max-w-[calc(100vw-240px)] md:ml-[240px] w-full flex flex-col overflow-y-auto p-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-4">Services</h1>
            <div className="flex gap-3">
              <Dialog>
                <DialogTrigger className="hidden md:flex px-4 py-2  items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  <IconPlus size={24} />
                  Create Category
                </DialogTrigger>
                <DialogTrigger className="md:hidden px-2 py-1 flex items-center  rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                  <IconPlus size={18} />
                  Category
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="mb-2">
                      <DialogTitle className="mb-2">Fill each field</DialogTitle>
                      <DialogDescription>
                        Feel free to create categories for future tasks.
                      </DialogDescription>
                    </div>
                    <DialogClose asChild>
                      <DialogCategoryForm />
                    </DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                {/* {!categories || categories.length === 0 ? (
                  <DialogTrigger
                    disabled
                    className="hidden px-4 py-2 md:flex items-center gap-2 rounded-md bg-gray-500 text-primary-foreground cursor"
                  >
                    <IconPlus size={24} />
                    Create Subcategory
                  </DialogTrigger>
                ) : (
                  <DialogTrigger className="hidden px-4 py-2 md:flex items-center gap-2 rounded-md bg-teal-600 text-primary-foreground hover:bg-teal-500 transition-all">
                    <IconPlus size={24} />
                    Create Subcategory
                  </DialogTrigger>
                )} */}
                <DialogTrigger className="hidden px-4 py-2 md:flex items-center gap-2 rounded-md bg-teal-600 text-primary-foreground hover:bg-teal-500 transition-all">
                  <IconPlus size={24} />
                  Create Subcategory
                </DialogTrigger>
                <DialogTrigger className="md:hidden px-2 py-1 flex items-center rounded-md bg-teal-600 text-primary-foreground hover:bg-teal-500 transition-all">
                  <IconPlus size={18} />
                  Subcategory
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <div className="mb-2">
                      <DialogTitle className="mb-2">Fill each field</DialogTitle>
                      <DialogDescription>
                        Here you will be creating a subcategory associeated to a
                        category
                      </DialogDescription>
                    </div>
                    <DialogClose asChild>
                      <DialogSubcategoryForm category={categories} />
                    </DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Suspense
            fallback={
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            }
          >
            <ServicesUI />
          </Suspense>
        </section>
      </main>
    </LayoutSelector>
  );
};

