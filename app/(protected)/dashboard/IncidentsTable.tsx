"use client"

import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { DataTable } from "@/app/(protected)/service-provider/tasks/components/data-table";
import { incidentsColumns } from "@/app/(protected)/service-provider/tasks/components/columns";
import { incidentSchema, IncidentType } from "@/app/(protected)/service-provider/tasks/data/schema";
import { fetchData } from "@/lib/fetch";
import { useToast } from "@/components/hooks/use-toast";
import { apiUrl } from "@/auth.config";

// Main Page Component
export default function IncidentsTable() {

  const [incidents, setIncidents] = useState<IncidentType[]>([]);
  const { toast } = useToast();

  const fetchIncidents = useCallback(async () => {
    const response = await fetchData<IncidentType[]>(`${apiUrl}api/incidents`);

    if (!response.data) {
      toast({
        title: "Error on get incidents",
        description: "Should a problem trying to get incidents",
        variant: "destructive",
      });
      return;
    }

    if (response.data.length === 0) {
      toast({
        title: "Empty incidents list",
        description: "Don't have any incident to show",
      });
      setIncidents([]);
      return;
    }

    try {
      setIncidents(z.array(incidentSchema).parse(response.data));
    } catch (error) {
      toast({
        title: "Data error",
        description: "Failed to parse incidents data",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return (
    <div>
      <DataTable data={incidents} columns={incidentsColumns} inputQuery="name" placeholder="Search subject" />
    </div>
  );
}
