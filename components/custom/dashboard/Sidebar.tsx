"use client";
import React, { useState, useEffect, useRef } from "react";
import SidebarContent from "./SidebarContent";
import SidebarItemLink from "../Sidebar/SidebarItemLink";
import SidebarItemsLinkContainer from "../Sidebar/SidebarItemsLinkContainer";
import { SidebarLinkIconSize } from "@/lib/measurementUnits";

import {
  IconBuildingEstate,
  IconTools,
  IconUsersGroup,
  IconHome,
  IconUser,
  IconMenu2,
  IconArrowBarLeft,
} from "@tabler/icons-react";

const Sidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 950) {
        // Adjust the value as needed
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className={`${
          showSidebar && windowWidth <= 950
            ? "absolute top-0 left-0 bg-white h-full w-44 z-50 bg-opacity-80 backdrop-blur-sm shadow-md "
            : showSidebar
            ? "w-64 bg-white h-full"
            : "hidden"
        }`}
      >
        <div>
          <div className="mt-4">
            <SidebarItemsLinkContainer>
              <SidebarItemLink href="/dashboard">
                <IconHome />
                Home
              </SidebarItemLink>
            </SidebarItemsLinkContainer>
          </div>
          <div className="flex flex-col">
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
            <div className="justify-end">
              <IconArrowBarLeft
                onClick={handleToggleSidebar}
                height={25}
                width={25}
                className={`${
                  showSidebar && windowWidth > 950 ? "hidden" : "self-end mt-3"
                }`}
              ></IconArrowBarLeft>
            </div>
          </div>
        </div>
      </div>

      {windowWidth <= 950 && !showSidebar && (
        <div className="bg-slate-50 h-full absolute top-0 left-0">
          <IconMenu2
            onClick={handleToggleSidebar}
            height={25}
            width={25}
            className="absolute -top-14 left-3"
          ></IconMenu2>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
