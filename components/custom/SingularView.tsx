"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ServiceProviderBill from "./ServiceProviderBill";

interface TaskProps {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}
interface PropertieProps {
  propertyName: string;
  address: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  description: string;
}
type Props =
  | { mode: "task"; task: TaskProps; propertie?: never }
  | { mode: "propertie"; propertie: PropertieProps; task?: never };
const SingularView: React.FC<Props> = ({ mode, task, propertie }) => {
  if (mode === "task" && task) {
    const [isComplete, setIsComplete] = React.useState(false);
    return (
      <Card className=" mx-12 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
          <h1 className="text-xl font-semibold">{task.title}</h1>
        </CardHeader>
        <CardContent className="p-4">
          <div>
            <p className="text-gray-700 mb-4">{task.description}</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              <span className="font-medium">Date:</span> {task.dueDate}
            </p>
            <p>
              <span className="font-medium">Priority:</span> {task.priority}
            </p>
            <p>
              <span className="font-medium">Status:</span> {task.status}
            </p>
          </div>
          <div className="mt-4">{isComplete && <ServiceProviderBill />}</div>
        </CardContent>
        <CardFooter className="bg-gray-100 p-4 flex justify-end items-center">
          <div className="flex justify-end text-end gap-2">
            <Button
              variant={isComplete ? "outline" : "default"}
              onClick={() => setIsComplete(!isComplete)}
            >
              {isComplete ? "Cancel" : "Complete Task"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  } else if (mode === "propertie" && propertie) {
    return (
      <Card className=" mx-auto shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        <CardHeader className="bg-gray-100 p-4">
          <div className="relative h-64">
            <Image
              src={"/img/propertieImg.jpg"}
              alt={propertie.propertyName}
              layout="fill"
              objectFit="cover"
              className="max-w-6xl mx-auto rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{propertie.propertyName}</h2>
            <p className="text-gray-500">{propertie.address}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-700">{propertie.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            <p>Own by: {propertie.customerName}</p>
            <p>email: {propertie.email}</p>
            <p>phone: {propertie.phoneNumber}</p>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 p-4 flex justify-end items-center">
          <div className="flex justify-end text-end gap-2">
            <Button variant="outline">Edit propertie</Button>
            <Button variant="destructive">Delete propertie</Button>
          </div>
        </CardFooter>
      </Card>
    );
  } else {
    return <div>No data available</div>;
  }
};

export default SingularView;
