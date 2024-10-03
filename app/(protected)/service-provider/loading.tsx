import LayoutSelector from "@/components/custom/LayoutSelector";
import { Skeleton } from "@/components/ui/skeleton";

export default async function loading() {
  return (
    <LayoutSelector layout="service-provider">
      <main className="w-full">
        <section className=" flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col space-y-10">
            <div className=" flex flex-row justify-between space-x-48">
              <Skeleton className="h-4 w-[350px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>

            <div className="  space-y-20 w-full">
              <Skeleton className="h-[600px] w-[1050px] rounded-xl" />
            </div>
          </div>
        </section>
      </main>
    </LayoutSelector>
  );
}
