// components/DashboardLayout.tsx
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";
import {
  IconMessagePlus,
  IconChecklist,
  IconCalendar,
  IconFile,
  IconHome,
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
      <Header name={session?.user.name} email={session ? session.user?.email : "Fullname"} image={session?.user.image} role={session?.user.role} />

      <div className="flex h-screen w-full">
        <Sidebar
          sidebarItems={[
            {
              href: "/customer",
              icon: <IconHome />,
              text: "Home",
            },
            {
              href: "/customer/tasks",
              icon: <IconFile />,
              text: "Tasks",
            },
            {
              href: "/customer/calendar",
              icon: <IconCalendar />,
              text: "Calendar",
            },
          ]}
        />
        {children}
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
