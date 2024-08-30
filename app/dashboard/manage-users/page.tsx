import LayoutSelector from "@/components/custom/LayoutSelector";
import React from "react";

import { fetchUsers } from "@/lib/fetch";
import { UserView } from "./userView";
import { User } from "@/lib/types";

const ManageUsers = async () => {
  try {
    const usersResult = await fetchUsers();
    const users: User[] = usersResult.data || [];

    return (
      <main>
        <LayoutSelector layout="default">
          <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col gap-6 overflow-y-auto p-4">
            <UserView users={users} />
          </section>
        </LayoutSelector>
      </main>
    );
  } catch (error: any) {
    return (
      <main>
        <LayoutSelector layout="default">
          <section className="h-[calc(100vh-5.6rem)] max-w-[calc(100vw-240px)] ml-[240px] flex flex-col gap-6 overflow-y-auto p-4">
            <p>Error: {error.message}</p>
            <a href="/dashboard">Go to main dashboard</a>
          </section>
        </LayoutSelector>
      </main>
    );
  }
};

export default ManageUsers;
