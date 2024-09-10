import { DashboardTable } from "@/components/custom/dashboard/Table";
import ServiceProvidersList from "./ServiceProvidersList";

import { User } from '@/lib/types';
import { fetchServiceProviders } from '@/lib/fetch';


export default async function ServiceProvidersUI() {

  const serviceProvidersResult = await fetchServiceProviders();
  const serviceProviders: User[] = serviceProvidersResult.data || [];

  return (
  
      <div className="grid grid-cols-5 gap-4 mb-6 w-full">
        <div className="col-span-5 md:col-span-2">
          <ServiceProvidersList serviceProviders={serviceProviders} />
        </div>
        <div className="col-span-5 md:col-span-3 flex flex-col gap-2 border rounded-lg border-gray-200 shadow-md p-3">
          <h2 className="text-xl font-semibold">Last invoices</h2>
          <DashboardTable />
        </div>
      </div>
    
  )
}

