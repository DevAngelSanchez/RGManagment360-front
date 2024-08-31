import { CategoryTable } from "./categoryTable";
import { SubCategoryTable } from "./subCategoryTable";

import { Category, Subcategory } from "@/lib/types";
import { fetchCategories, fetchSubcategories } from "@/lib/fetch";


export default async function ServicesUI() {
  const categoriesResult = await fetchCategories();
  const subcategoriesResult = await fetchSubcategories();

  const categories: Category[] = categoriesResult.data || [];
  const subcategories: Subcategory[] = subcategoriesResult.data || [];

  return (
    <>
      <div className="flex flex-col items-start w-full p-4 gap-8 mb-6 md:flex-row">
        <div className="lg:w-2/5 xl:w-2/5 w-full">
          <CategoryTable category={categories} />
        </div>
        <div className="lg:w-3/5 w-full">
          <SubCategoryTable
            categories={categories}
            subcategories={subcategories}
          />
        </div>
      </div>
    </>
  );
};
