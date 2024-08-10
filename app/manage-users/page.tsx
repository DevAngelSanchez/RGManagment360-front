import LayoutSelector from "@/components/custom/LayoutSelector";
import React from "react";

const ManageUsers = () => {

  return(
    <main>
    <LayoutSelector layout="default">
      <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col overflow-y-auto p-4">
        <h1 className="text-4xl font-bold mb-4">USERS</h1>
      </section>
    </LayoutSelector>
  </main>
  )
};

export default ManageUsers;
