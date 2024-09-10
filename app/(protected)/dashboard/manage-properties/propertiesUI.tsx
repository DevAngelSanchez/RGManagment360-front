import { PropertiesTable } from "@/app/dashboard/manage-properties/propertiesTable";
import { fetchProperties } from "@/lib/fetch";
import { Property } from "@/lib/types";

export default async function PropertiesUI() {
  const propertiesResult = await fetchProperties();
  const properties: Property[] = propertiesResult.data || [];

  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-6">
        <PropertiesTable properties={properties} />
      </div>
    </>
  )
}