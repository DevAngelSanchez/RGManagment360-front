// components/DashboardLayout.tsx
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";
import {
  IconMessagePlus,
  IconChecklist,
  IconCalendar,
} from "@tabler/icons-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const ServiceProviderLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const session = await auth();

  return (
    <div className="w-full ">
      <Header email={session ? session.user?.email : "Username"} />

      <div className="flex h-screen w-full">
        <Sidebar
          sidebarItems={[
            {
              href: "/customer",
              icon: <IconCalendar />,
              text: "Calendar",
            },
            {
              href: "/customer/tasks",
              icon: <IconChecklist />,
              text: "Tasks",
            },
            {
              href: "/customer/incidences",
              icon: <IconMessagePlus />,
              text: "Incidences",
            },
          ]}
        />
        {children}
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
