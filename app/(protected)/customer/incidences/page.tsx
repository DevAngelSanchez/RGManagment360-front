import LayoutSelector from "@/components/custom/LayoutSelector";
import { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateIncidentForm } from "./forms/create";
import { IconPlus } from "@tabler/icons-react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import IncidentsTable from "./incidentsTable";

// Main Page Component
export default async function Page() {

  const session = await auth();

  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  return (
    <LayoutSelector layout="customer">
      <main className="w-full h-full bg-slate-50">
        <section className="p-4 overflow-y-auto">
          <Fragment>
            {/* Desktop View */}
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                  <p className="text-muted-foreground">
                    Here's a list of your incidents for this month!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger className="px-4 py-2 flex items-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                      <IconPlus size={24} />
                      Create a new incident
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Incident</DialogTitle>
                      </DialogHeader>
                      <CreateIncidentForm clientId={userId} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Task Table */}
              <IncidentsTable clientId={userId} />
            </div>
          </Fragment>
        </section>
      </main>
      <Toaster />
    </LayoutSelector>
  );
}