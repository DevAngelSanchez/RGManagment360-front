"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Property } from "@/lib/types";
import { apiUrl } from "@/auth.config";
import { useRouter } from "next/navigation";
import { IconPlus } from "@tabler/icons-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIncident } from "./actions";
import AlertComponent from "@/components/custom/alert";

interface Props {
  clientId: string;
}

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  propertyId: z.string().min(1, "Property is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .instanceof(File)
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "The file must be less than 5MB",
    })
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), {
      message: "The file must be a JPG or PNG image",
    }),
});

export function CreateInsidenceForm({ clientId }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: "",
    propertyId: "",
    description: "",
    image: null as File | null,
  });
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ title: "", description: "", type: "default", show: false });
  const { toast } = useToast();
  function resetAlert() {
    return setAlert({ title: "", description: "", type: "default", show: false });
  }

  useEffect(() => {
    const getProperties = async () => {
      try {
        if (!clientId) {
          toast({
            title: "Error",
            description: "Client ID is required",
            variant: "destructive", // Estilo de error
          });
          return;
        }

        // Hacer la solicitud al endpoint
        const response = await fetch(`${apiUrl}api/properties-by-client/${clientId}`);

        // Manejar respuestas que no sean exitosas
        if (!response.ok) {
          if (response.status === 404) {
            toast({
              title: "No Properties Found",
              description: "No properties found for the specified client ID.",
              variant: "destructive", // Estilo de advertencia
            });
          } else {
            toast({
              title: "Error Fetching Properties",
              description: "An error occurred while fetching the properties.",
              variant: "destructive",
            });
          }
          return;
        }

        // Procesar la respuesta en formato JSON
        const data = await response.json();

        // Verificar si los datos están vacíos
        if (!data || data.length === 0) {
          toast({
            title: "No Properties",
            description: "The response contains no properties.",
            variant: "destructive", // Estilo informativo
          });
          return;
        }

        toast({
          title: "Properties Loaded",
          description: `${data.length} properties successfully loaded.`,
          variant: "default", // Estilo de éxito
        });

        // Aquí podrías actualizar el estado con los datos, si es necesario
        setProperties(data);

      } catch (error) {
        // Manejar errores en la solicitud
        toast({
          title: "Unexpected Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
        console.error("An unexpected error occurred:", error);
      }
    };

    getProperties();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await createIncident(values.subject, values.description, values.propertyId, values.image, clientId)
      setIsLoading(false);
      if (result.type === "error") {
        resetAlert();
        setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
        setTimeout(() => {
          resetAlert();
        }, 3000);
        return null;
      }
      setAlert({ title: result.title, description: result.msg, type: result.type, show: true });
      setTimeout(() => {
        resetAlert();
      }, 3000);
      router.refresh();
    } catch (error) {
      resetAlert();
      setAlert({ title: "Error!", description: "Error trying to create this incident", type: "error", show: true });
      setTimeout(() => {
        resetAlert()
      }, 3000);
      console.log(error);
      setIsLoading(false);
      return;
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      propertyId: "",
      image: undefined,
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
                  placeholder="I need help with..."
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
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties &&
                      properties.map((value, index) => (
                        <SelectItem key={index} value={value.id?.toString()}>
                          {value.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please include all information relevant to your issue."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload an image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
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
                <IconPlus size={24} />
                <span>Create Incident</span>
              </>
            )}
          </Button>
        </div>
      </form>

      {alert.show && (
        <AlertComponent title={alert.title} msg={alert.description} type={alert.type} show={true} />
      )}
    </Form>
  );
}
