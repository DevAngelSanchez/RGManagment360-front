"use client"

import { fetchData, fetchProperties, } from "@/lib/fetch";

import { Fragment, useEffect, useState } from "react";
import { DataTable } from "../../service-provider/tasks/components/data-table";
import { propertiesColumns } from "../../service-provider/tasks/components/columns";
import { PropertyType } from "../../service-provider/tasks/data/schema";
import { apiUrl } from "@/auth.config";

export default async function PropertiesTable() {

  const [properties, setProperties] = useState<PropertyType[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await fetchData<PropertyType[]>(`${apiUrl}api/properties`);
      if (response.data) {
        setProperties(response.data)
      }
    }
    get();
  }, [])

  return (
    <Fragment>
      <main className="w-full h-full bg-slate-50 flex flex-col md:flex-row gap-2">
        <section className="overflow-y-auto w-full">
          <div className="bg-white rounded-md border shadow-black/50">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <DataTable
                data={properties || []}
                columns={propertiesColumns}
                inputQuery="name"
                placeholder="Filter by name..."
              />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

