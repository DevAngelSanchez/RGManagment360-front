import LayoutSelector from "@/components/custom/LayoutSelector";
import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
  return (
    <LayoutSelector layout="default">
      <main className="w-full">
        <section className=" flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col space-y-10">
            <div className=" flex flex-row justify-between space-x-48">
              <Skeleton className="h-4 w-[350px]" />
             
            </div>

            <div className="flex flex-row space-x-20 justify-between">
              <Skeleton className="h-[400px] w-[450px] rounded-xl" />
              <Skeleton className="h-[600px] w-[450px] rounded-xl" />
            </div>
            <div className="flex flex-row space-x-20 justify-between mt-5">
              <Skeleton className="h-[400px] w-[450px] rounded-xl" />
              <Skeleton className="h-[400px] w-[450px] rounded-xl" />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}
