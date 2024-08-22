import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { ChartComponent } from "@/components/custom/dashboard/Chart";
import { DashboardTable } from "@/components/custom/dashboard/Table";
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

import { Supplier } from "./manage-suppliers/SuppliersList";
import { fetchSuppliers } from "@/lib/fetch";

export default async function Dashboard() {
  const session = await auth();

  if (session === null) {
    return redirect("/auth/login");
  }

  let suppliers: Supplier[] = [];
  suppliers = await fetchSuppliers();

  return (
    <main>
      <LayoutSelector layout="default">
        <section className="h-[calc(100vh-5.6rem)] md:max-w-[calc(100vw-240px)] md:ml-[240px] flex flex-col overflow-y-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Last 6 months data chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartComponent />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-2">
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
                <CardContent>
                  <ScrollArea className="h-[490px]">
                    <div className="h-max pr-4">
                      {suppliers &&
                        suppliers.map((item) => (
                          <DirectoryItem
                            key={item.id}
                            name={item.name}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 border rounded-lg border-gray-200 shadow-md p-3">
              <h2 className="text-xl font-semibold">Last invoices</h2>
              <DashboardTable />
            </div>
            <div className="flex flex-col gap-2 border rounded-lg border-gray-200 shadow-md p-3">
              <h2 className="text-xl font-semibold">Last Employees</h2>
              <DashboardTable />
            </div>
          </div>
        </section>
      </LayoutSelector>
    </main>
  );
}
