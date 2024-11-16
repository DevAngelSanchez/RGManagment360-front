"use client";

import { useState } from "react";
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
import { toast } from "@/components/ui/use-toast";

export function CreateInsidenceForm() {
  const [formData, setFormData] = useState({
    subject: "",
    property: "",
    description: "",
    image: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast({ title: "Success", description: "Incidence created successfully!", variant: "success" });
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
