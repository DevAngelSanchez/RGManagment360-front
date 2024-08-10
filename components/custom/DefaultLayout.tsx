// components/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { auth } from "@/auth";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";
import { DashboardTable } from "@/components/custom/dashboard/Table";



type DashboardLayoutProps = {
  children: ReactNode;
};


const  DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <div>
         <Header email={"jose"} />
          <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;