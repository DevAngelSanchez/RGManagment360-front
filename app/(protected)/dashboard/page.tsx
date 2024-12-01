import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Toast } from "@/components/ui/toast";
import { ChartComponent } from "@/components/custom/dashboard/Chart";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LayoutSelector from "@/components/custom/LayoutSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconUsersGroup } from "@tabler/icons-react";
import DirectoryItem from "@/components/custom/dashboard/DirectoryItem";

import { fetchServiceProviders } from "@/lib/fetch";
import { User } from "@/lib/types";
import IncidentsTable from "./IncidentsTable";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  if (session?.user?.role === "SERVICE_PROVIDER") {
    return redirect("/service-provider");
  }

  if (session?.user?.role === "CUSTOMER") {
    return redirect("/customer");
  }

  const serviceProvidersResult = await fetchServiceProviders();
  const servicesProviders: User[] = serviceProvidersResult.data || [];

  return (
    <main>
      <LayoutSelector layout="default">
        <section className=" flex flex-col overflow-y-auto p-4 bg-slate-50 w-full">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="md:col-span-3 col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>Last incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncidentsTable />
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2 col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconUsersGroup size="24" />
                    List of Suppliers
                  </CardTitle>
                  <CardDescription>
                    A list of the most important suppliers
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                  <ScrollArea className="h-[450px]">
                    <div className="h-max pr-4">
                      {servicesProviders &&
                        servicesProviders.map((item) => (
                          <DirectoryItem
                            key={item.id}
                            name={item.fullname}
                            email={item.email}
                            phone={item.phone}
                          />
                        ))}
                    </div>
                    <ScrollBar />
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </LayoutSelector>
    </main>
  );
}
