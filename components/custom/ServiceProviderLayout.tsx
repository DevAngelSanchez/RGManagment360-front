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
      <Header name={session?.user.name} email={session ? session.user?.email : "Fullname"} image={session?.user.image} />

      <div className="flex h-screen w-full">
        <Sidebar sidebarItems={[{
          href: "/service-provider",
          icon: <IconCalendar />,
          text: "Calendar"
        },
        {
          href: "/service-provider/manage-tasks",
          icon: <IconChecklist />,
          text: "Tasks"
        }
        ]} />
        {children}
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
