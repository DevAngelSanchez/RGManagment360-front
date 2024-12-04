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

export default async function ServicesUI() {
  const categoriesResult = await fetchCategories();
  const subcategoriesResult = await fetchSubcategories();

  // const categories: Category[] = categoriesResult.data || [];
  // const subcategories: Subcategory[] = subcategoriesResult.data || [];

  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row  sm:justify-between">
        <h1 className="text-4xl font-bold mb-4">Incidences</h1>

      </div>
      <div className="flex flex-col items-start w-full mt-4 gap-8 mb-6 md:flex-row">
        <div className=" w-full">
          {/* <TaskTable /> */}
        </div>
        {/* <div className="lg:w-3/5 w-full">
          <SubCategoryTable
            categories={categories}
            subcategories={subcategories}
          />
        </div> */}
      </div>
    </Fragment>
  );
}
