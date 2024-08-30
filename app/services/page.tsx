import { Suspense } from "react";
import LayoutSelector from "@/components/custom/LayoutSelector";

import { fetchCategories, fetchSubcategories } from "@/lib/fetch";
import { Category, Subcategory } from "@/lib/types";
import ServicesUI from "./serviceUI";
import { Skeleton } from "@/components/ui/skeleton";

const Services = async () => {
  try {
    const categoriesResult = await fetchCategories();
    const subcategoriesResult = await fetchSubcategories();

    const categories: Category[] = categoriesResult.data || [];
    const subcategories: Subcategory[] = subcategoriesResult.data || [];

    return (
      <LayoutSelector layout="default">
        <main>
          <section className="bg-slate-50 h-[calc(100vh-5.6rem)] md:max-w-[calc(100vw-240px)] md:ml-[240px] w-full flex flex-col overflow-y-auto p-4">
            <Suspense
              fallback={
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
              }
            >
              <ServicesUI
                categories={categories}
                subcategories={subcategories}
              />
            </Suspense>
          </section>
        </main>
      </LayoutSelector>
    );
  } catch (error: any) {
    return (
      <LayoutSelector layout="default">
        <main>
          <section className="bg-slate-50 h-[calc(100vh-5.6rem)] md:max-w-[calc(100vw-240px)] md:ml-[240px] w-full flex flex-col overflow-y-auto p-4">
            <p>Error: {error.message}</p>
            <a href="/dashboard">Go to main dashboard</a>
          </section>
        </main>
      </LayoutSelector>
    );
  }
};

export default Services;
