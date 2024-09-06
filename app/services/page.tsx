import { Suspense } from "react";
import LayoutSelector from "@/components/custom/LayoutSelector";

import ServicesUI from "./serviceUI";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <LayoutSelector layout="default">
      <main className="w-full ">
        <section className="bg-slate-50 h-full   overflow-y-auto p-4">
          <Suspense
            fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
          >
            <ServicesUI />
          </Suspense>
        </section>
      </main>
    </LayoutSelector>
  );
}
