import LayoutSelector from "@/components/custom/LayoutSelector";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Event } from "@/lib/types";

import MyCalendar from "./calendar";
import dayjs from "dayjs";
import { auth } from "@/auth";

import { apiUrl } from "@/auth.config";

export default async function page() {

  const session = await auth()
  console.log(session?.accessToken)

  return (
    <LayoutSelector layout="default">
      <main className="w-full h-full bg-slate-50 ">
        <section className="flex flex-col overflow-y-auto p-4">
          <div className="flex flex-col w-full gap-2 mb-6">
            <h1 className="text-4xl font-bold mb-4">Calendar</h1>
            <Suspense fallback="Loading Calendar...">
              <MyCalendar accessToken={session?.accessToken} />
            </Suspense>
          </div>
        </section>
      </main>
    </LayoutSelector>
  )
}
