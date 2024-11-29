"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/hooks/use-toast";
import { Property } from "@/lib/types";
import { apiUrl } from "@/auth.config";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteIncident } from "../actions";
import AlertComponent from "@/components/custom/alert";
import { IncidentType } from "../../../service-provider/tasks/data/schema";
import { IconTrash } from "@tabler/icons-react";

interface Props {
  incidentId: number;
  incidentName: string;
  propertyName: string;
}

const formSchema = z.object({
  subject: z.string(),
  propertyName: z.string(),
});

export function DeleteIncidentForm({ incidentId, incidentName, propertyName }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });
  const { toast } = useToast();
  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await DeleteIncident(incidentId)
      setIsLoading(false);
      if (result.type === "error") {
        toast({
          title: result.type,
          description: result.msg,
          variant: "destructive",
        });
        return null;
      }
      toast({
        title: result.title,
        description: result.msg,
      });
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    } catch (error) {
      resetAlert();
      setAlert({ title: "Error!", description: "Error trying to delete this incident", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 3000);
      toast({
        title: "Error!",
        description: "Error trying to delete this incident",
        variant: "destructive",
      });
      console.log(error);
      setIsLoading(false);
      return;
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: incidentName,
      propertyName: propertyName,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="I need help with..." disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Property */}
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Input
                  placeholder="I need help with..." disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Footer */}
        <div className="flex justify-between space-x-2">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
            ) : (
              <>
                <IconTrash size={24} />
                <span>Edit Incident</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}