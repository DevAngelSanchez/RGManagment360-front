import LayoutSelector from "@/components/custom/LayoutSelector";
import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
  return (
    <LayoutSelector layout="service-provider">
      <main className="w-full">
        <section className=" flex flex-col overflow-y-auto p-4 w-full">
          <div className="flex flex-col space-y-10">
            <div className=" flex flex-row justify-between space-x-40 w-full">
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex flex-row space-x-5">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>

            <div className="flex flex-row space-x-5 justify-between">
              <Skeleton className="h-[600px] w-[450px] rounded-xl" />
              <Skeleton className="h-[600px] w-[450px] rounded-xl" />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}