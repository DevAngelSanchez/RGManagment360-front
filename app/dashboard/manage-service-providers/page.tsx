import LayoutSelector from "@/components/custom/LayoutSelector";
import { fetchServiceProviders } from "@/lib/fetch";
import { User } from "@/lib/types";
import ServiceProvidersUI from "./serviceProvidersUI";

export default async function ManageSuppliers() {

  const serviceProvidersResult = await fetchServiceProviders();
  const serviceProviders: User[] = serviceProvidersResult.data || [];

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">
          <ServiceProvidersUI serviceProviders={serviceProviders} />
        </section>
      </main>
    </LayoutSelector>
  )
}
