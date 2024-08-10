import SidebarItemLink from "../Sidebar/SidebarItemLink";
import SidebarItemsLinkContainer from "../Sidebar/SidebarItemsLinkContainer";
import { SidebarLinkIconSize } from "@/lib/measurementUnits";
import Link from "next/link";

import {
  IconBuildingEstate,
  IconFileInvoice,
  IconPackages,
  IconSettings,
  IconTools,
  IconUserCircle,
  IconUserStar,
  IconUsersGroup,
  IconHome,
  IconUser,
} from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <div className="fixed left-0 max-w-[240px] w-full h-[calc(100vh-5rem)] border-r border-r-gray-300 px-4 py-6">
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

            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/manage-users">
                <IconUser />
                Manage Users
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/dashboard/manage-employees">
                <IconTools size={SidebarLinkIconSize} />
                Employees
              </SidebarItemLink>
              <SidebarItemLink href="/dashboard/manage-customers">
                <IconUserStar size={SidebarLinkIconSize} />
                Customers
              </SidebarItemLink>
              <SidebarItemLink href="/dashboard/manage-suppliers">
                <IconUsersGroup size={SidebarLinkIconSize} />
                Suppliers
              </SidebarItemLink>
              <SidebarItemLink href="/dashbaord/manage-properties">
                <IconBuildingEstate />
                Properties
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
          <div>
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="">
                <IconPackages size={SidebarLinkIconSize} />
                Inventory
              </SidebarItemLink>
              <SidebarItemLink href="">
                <IconFileInvoice />
                Invoices
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
}
