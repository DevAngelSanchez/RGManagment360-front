import LayoutSelector from "@/components/custom/LayoutSelector";

import { fetchProperties } from "@/lib/fetch";
import PropertiesUI from "./propertiesUI";
import { Property } from "@/lib/types";

export default async function ManageProperties() {

  const propertiesResult = await fetchProperties();
  const properties: Property[] = propertiesResult.data || [];

  return (
    <LayoutSelector layout="default">
      <main>
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">
          <PropertiesUI properties={properties} />
        </section>
      </main>
    </LayoutSelector>
  )
}
