import { auth } from "@/auth";
import { ChartComponent } from "@/components/custom/dashboard/Chart";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";
import { DashboardTable } from "@/components/custom/dashboard/Table";
import LayoutSelector from "@/components/custom/LayoutSelector";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = await auth();

  if (session === null) {
    return redirect("/auth/login");
  }

  return (
    <main>
      <LayoutSelector layout="default">
        <Header email={session.user?.email} name={session.user?.name} />
        <Sidebar />
        <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">

          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-5">
            <div className="col-span-3">
              <ChartComponent />
            </div>
            <div className="col-span-2"></div>

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
  )
}
