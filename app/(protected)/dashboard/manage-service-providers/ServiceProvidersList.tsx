import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconUsersGroup } from '@tabler/icons-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import DirectoryItem from '@/components/custom/dashboard/DirectoryItem';
import { ScrollBar } from '@/components/ui/scroll-area';
import { User } from '@/lib/types';

interface Props {
  serviceProviders: User[]
}

const ServiceProvidersList: React.FC<Props> = ({ serviceProviders }) => {

  console.log(serviceProviders)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUsersGroup size="24" />
          List of Service Providers
        </CardTitle>
        <CardDescription>A list of the most important Service Providers</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[490px]">
          <div className='h-max pr-4'>
            {serviceProviders && serviceProviders.map(item => (
              <DirectoryItem key={item.id} name={item.name} email={item.email} phone={item.phone} />
            ))}
          </div>
          <ScrollBar />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ServiceProvidersList