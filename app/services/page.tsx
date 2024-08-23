import { CategoryTable } from "./categoryTable";
import { SubCategoryTable } from "./subCategoryTable";
import LayoutSelector from "@/components/custom/LayoutSelector";
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
import { fetchCategories, fetchSubcategories } from "@/lib/fetch";

const Services = async () => {
  const categories = await fetchCategories();
  const subcategories = await fetchSubcategories();

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
                      <DialogTitle className="mb-2">
                        Fill each field
                      </DialogTitle>
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
                      <DialogTitle className="mb-2">
                        Fill each field
                      </DialogTitle>
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
          <div className="flex flex-col items-start w-full p-4 gap-8 mb-6 md:flex-row">
            <div className="lg:w-2/5 xl:w-2/5 w-full">
              <CategoryTable category={categories} />
            </div>
            <div className="lg:w-3/5 w-full">
              <SubCategoryTable subcategories={subcategories} />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
};

export default Services;
