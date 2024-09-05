import { Suspense } from "react";
import LayoutSelector from "@/components/custom/LayoutSelector";

import ServicesUI from "./serviceUI";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <LayoutSelector layout="default">
      <main>
        <section className="bg-slate-50 h-[calc(100vh-5.6rem)] md:max-w-[calc(100vw-240px)] md:ml-[240px] w-full flex flex-col overflow-y-auto p-4">
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

