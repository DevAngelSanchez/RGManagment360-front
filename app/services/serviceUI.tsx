"use client";

import { useState } from "react";
import { CategoryTable } from "./categoryTable";
import { SubCategoryTable } from "./subCategoryTable";
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
import { Category, Subcategory } from "@/lib/types";

interface Props {
  categories: Category[];
  subcategories: Subcategory[];
}

const ServicesUI: React.FC<Props> = async ({ categories, subcategories }) => {
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [selectedSubcategories, setSelectedSubcategories] =
    useState(subcategories);

  return (
    <>
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
            {!selectedCategories || selectedCategories.length === 0 ? (
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
            )}
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
                  <DialogSubcategoryForm category={selectedCategories} />
                </DialogClose>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-8 mb-6 md:flex-row">
        <div className="lg:w-2/5 xl:w-2/5 w-full">
          <CategoryTable category={selectedCategories} />
        </div>
        <div className="lg:w-3/5 w-full">
          <SubCategoryTable
            categories={selectedCategories}
            subcategories={selectedSubcategories}
          />
        </div>
      </div>
    </>
  );
};

export default ServicesUI;
