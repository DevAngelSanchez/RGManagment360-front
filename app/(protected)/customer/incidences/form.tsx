"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Property } from "@/lib/types";
import { apiUrl } from "@/auth.config";

interface Props {
  clientId?: string;
}

export function CreateInsidenceForm({ clientId }: Props) {
  const [formData, setFormData] = useState({
    subject: "",
    property: "",
    description: "",
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getProperties = async () => {
      try {
        // Verificar si `clientId` es válido antes de hacer la solicitud
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

        console.log("Properties:", data);
        // Aquí podrías actualizar el estado con los datos, si es necesario
        // setProperties(data);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, property: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async () => {
    if (!formData.subject || !formData.property || !formData.description) {
      toast({ title: "Error", description: "All fields are required except the image.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("subject", formData.subject);
    formPayload.append("property", formData.property);
    formPayload.append("description", formData.description);
    if (formData.image) {
      formPayload.append("image", formData.image);
    }

    try {
      const response = await fetch("/api/incidence", {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        toast({ title: "Success", description: "Incidence created successfully!", variant: "default" });
        setFormData({ subject: "", property: "", description: "", image: null });
      } else {
        const error = await response.json();
        toast({ title: "Error", description: error.message || "Something went wrong.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to create incidence.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Incidence</CardTitle>
        <CardDescription>Which property are you having problems with?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="I need help with..."
            value={formData.subject}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="property">Property</Label>
            <Select onValueChange={handleSelectChange} value={formData.property}>
              <SelectTrigger id="property">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doral">Doral</SelectItem>
                <SelectItem value="bayHarborIslands">Bay Harbor Islands</SelectItem>
                <SelectItem value="coralGables">Coral Gables</SelectItem>
                <SelectItem value="westPalmBeach">West Palm Beach</SelectItem>
                <SelectItem value="elPortal">El Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please include all information relevant to your issue."
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Upload an image (optional)</Label>
          <Input id="image" type="file" onChange={handleFileChange} />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
