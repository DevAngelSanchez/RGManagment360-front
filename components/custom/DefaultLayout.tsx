// components/DashboardLayout.tsx
import React, { ReactNode } from 'react';
import { auth } from "@/auth";
import Header from "@/components/custom/dashboard/Header";
import Sidebar from "@/components/custom/dashboard/Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};


const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children }) => {

  const session = await auth();

  return (
    <div>
      <Header email={session ? session.user?.email : "Username"} />
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;