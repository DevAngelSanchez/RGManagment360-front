"use client"

import { fetchUsers } from "@/lib/fetch";

import { Fragment, useEffect, useState } from "react";
import { DataTable } from "../../service-provider/tasks/components/data-table";
import { usersColumns } from "../../service-provider/tasks/components/columns";
import { UserType } from "@/lib/schemas/userSchema";

export default async function UsersTable() {

  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers();
      if (response.data) {
        setUsers(response.data)
      }
    }
    getUsers();
  }, [])


  return (
    <Fragment>
      <main className="w-full h-full bg-slate-50 flex flex-col md:flex-row gap-2">
        <section className="overflow-y-auto w-full">
          <div className="bg-white rounded-md border shadow-black/50">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              <DataTable
                data={users || []}
                columns={usersColumns}
                inputQuery="name"
                placeholder="Filter by name..."
              />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
