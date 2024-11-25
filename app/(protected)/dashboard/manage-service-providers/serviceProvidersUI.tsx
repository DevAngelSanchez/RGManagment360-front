import { DashboardTable } from "@/components/custom/dashboard/Table";
import ServiceProvidersList from "./ServiceProvidersList";

import { User } from '@/lib/types';
import { fetchServiceProviders } from '@/lib/fetch';


export default async function ServiceProvidersUI() {

  const serviceProvidersResult = await fetchServiceProviders();
  const serviceProviders: User[] = serviceProvidersResult.data || [];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6 w-full">
      <div className="col-span-5">
        <ServiceProvidersList serviceProviders={serviceProviders} />
      </div>
    </div>
  )
}

