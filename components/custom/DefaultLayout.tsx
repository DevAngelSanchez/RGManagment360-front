// components/DashboardLayout.tsx
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";
import {
  IconBuildingEstate,
  IconTools,
  IconUsersGroup,
  IconHome,
  IconUser,
  IconMenu2,
  IconArrowBarLeft,
  IconCalendar,
  IconChecklist,
} from "@tabler/icons-react";
import { SidebarLinkIconSize } from "@/lib/measurementUnits";
type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
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
              href: "/dashboard",
              icon: <IconHome />,
              text: "Home",
            },
            {
              href: "/dashboard/manage-users",
              icon: <IconUser />,
              text: "Manage Users",
            },
            {
              href: "/services",
              icon: <IconTools size={SidebarLinkIconSize} />,
              text: "Services"
            },
            {
              href: "/dashboard/manage-service-providers",
              icon: <IconUsersGroup size={SidebarLinkIconSize} />,
              text: "Services Providers"
            },
            {
              href: "/dashboard/manage-properties",
              icon: <IconBuildingEstate />,
              text: "Properties"
            },
            {
              href: "/dashboard/calendar",
              icon: <IconCalendar />,
              text: "Calendar"
            },
            {
              href: "/dashboard/taskslist",
              icon: <IconChecklist />,
              text: "Tasklist"
            },
          ]}
        />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
