"use client";

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
import Dropzone from "dropzone";


export function CreateInsidenceForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an insidence</CardTitle>
        <CardDescription>
          Which property are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="I need help with..." />
        </div>
        <div className="grid  gap-4">
          <div className="grid gap-2">
            <Label htmlFor="property">Property</Label>
            <Select defaultValue="doral">
              <SelectTrigger id="property">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doral">Doral</SelectItem>
                <SelectItem value="bayHarborIslands">
                  Bay Harbor Islands
                </SelectItem>
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
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Upload an image (optional)</Label>
          <Input id="image" type="file" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Upload an image (optional)</Label>
          <Input id="image" type="file" />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
