"use client"

import { useState, useEffect } from "react";
import { z } from "zod";
import { redirect } from "next/navigation";
import { DataTable } from "@/app/(protected)/service-provider/tasks/components/data-table";
import { incidentsColumns } from "@/app/(protected)/service-provider/tasks/components/columns";
import { incidentSchema, IncidentType } from "../../service-provider/tasks/data/schema";
import { fetchIncidents } from "@/lib/fetch";
import { useToast } from "@/components/hooks/use-toast";

// Main Page Component
export default async function IncidentsTable() {

  const [incidents, setIncidents] = useState<IncidentType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getIncidents = async () => {
      const response = await fetchIncidents();

      if (!response.data) {
        toast({
          title: "Error on get incidents",
          description: "Should a problem trying to get incidents",
          variant: "destructive"
        });
        return;
      }

      if (response.data.length === 0) {
        toast({
          title: "Empty incidents list",
          description: "Don't have any incident to show",
        });
        return;
      }

      setIncidents(z.array(incidentSchema).parse(response.data));
    }

    getIncidents()
  }, [])

  return (
    <div>
      <DataTable data={incidents} columns={incidentsColumns} inputQuery="name" placeholder="Search subject" />
    </div>
  );
}
