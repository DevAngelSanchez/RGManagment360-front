import SidebarItemLink from "../Sidebar/SidebarItemLink";
import SidebarItemsLinkContainer from "../Sidebar/SidebarItemsLinkContainer";
import { SidebarLinkIconSize } from "@/lib/measurementUnits";

import {
  IconBuildingEstate,
  IconTools,
  IconUsersGroup,
  IconHome,
  IconUser,
} from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <div className="md:fixed relative left-0 md:max-w-[240px] w-full md:h-[calc(100vh-5rem)] border-r border-r-gray-300 px-4 py-6 md:flex hidden">
      <div className="flex flex-col justify-between gap-2 h-full">
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold uppercase pl-2">Managment</h3>

          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/dashboard">
                <IconHome />
                Home
              </SidebarItemLink>
            </SidebarItemsLinkContainer>

          </div>
          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/dashboard/manage-users">
                <IconUser />
                Manage Users
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/services">
                <IconTools size={SidebarLinkIconSize} />
                Services
              </SidebarItemLink>
              <SidebarItemLink href="/dashboard/manage-service-providers">
                <IconUsersGroup size={SidebarLinkIconSize} />
                Services Providers
              </SidebarItemLink>
              <SidebarItemLink href="/dashboard/manage-properties">
                <IconBuildingEstate />
                Properties
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
        </div>
        {/* <div>
          <SidebarItemsLinkContainer>
            <SidebarItemLink href="">
              <IconUserCircle />
              Profile
            </SidebarItemLink>
            <SidebarItemLink href="">
              <IconSettings />
              Settings
            </SidebarItemLink>
          </SidebarItemsLinkContainer>
        </div> */}
      </div>
    </div>
  );
}
