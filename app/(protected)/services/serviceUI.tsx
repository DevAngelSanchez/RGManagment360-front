import { CategoryTable } from "./categoryTable";
import { SubCategoryTable } from "./subCategoryTable";
import { Category, Subcategory } from "@/lib/types";
import { fetchCategories, fetchSubcategories } from "@/lib/fetch";

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
import { Fragment } from "react";
import { DataTable } from "../service-provider/tasks/components/data-table";
import { categoryColums, subcategoryColumns } from "../service-provider/tasks/components/columns";

export default async function ServicesUI() {
  const categoriesResult = await fetchCategories();
  const subcategoriesResult = await fetchSubcategories();

  const categories: Category[] = categoriesResult.data || [];
  const subcategories: Subcategory[] = subcategoriesResult.data || [];

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row  sm:justify-between mb-4">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger className="hidden sm:flex px-4 py-2 items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
              <IconPlus size={24} />
              Create Category
            </DialogTrigger>
            <DialogTrigger className="sm:hidden px-2 py-1 flex items-center  rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
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
                    Here you will be creating a subcategory associated to a
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
      {/* <div className="flex flex-col items-start w-full mt-4 gap-8 mb-6 md:flex-row">
        <div className="lg:w-2/5 xl:w-2/5 w-full">
          <CategoryTable category={categories} />
        </div>
        <div className="lg:w-3/5 w-full">
          <SubCategoryTable
            categories={categories}
            subcategories={subcategories}
          />
        </div>
      </div> */}
      <main className="w-full h-full bg-slate-50 flex flex-col md:flex-row gap-2">
        <section className="overflow-y-auto w-full">
          <div className="bg-white rounded-md border shadow-black/50">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of all categories!
                  </p>
                </div>
              </div>
              <DataTable
                data={categories || []}
                columns={categoryColums}
              />
            </div>
          </div>
        </section>
        <section className="overflow-y-auto w-full">
          <div className="bg-white rounded-md border shadow-black/50">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Subcategories</h2>
                  <p className="text-muted-foreground">
                    Here&apos;s a list of all subcategories!
                  </p>
                </div>
              </div>
              <DataTable
                data={subcategories || []}
                columns={subcategoryColumns}
              />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
