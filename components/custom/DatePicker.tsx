"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  selectedDate: Date | undefined;
  onChange: (date: Date | undefined) => void; // Prop para manejar el cambio
}

export function MainDatePicker({ selectedDate, onChange }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  React.useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate); // Llamamos a onChange con la fecha seleccionada
  };

  return (
    <Calendar
    mode="single"
    selected={date}
    onSelect={handleSelect}
    initialFocus
  />
    
      // <Popover>
      //   <PopoverTrigger asChild>
      //     <Button
      //       variant={"outline"}
      //       className={cn(
      //         "w-full justify-start text-left font-normal",
      //         !date && "text-muted-foreground"
      //       )}
      //     >
      //       <CalendarIcon className="mr-2 h-4 w-4" />
      //       {date ? format(date, "PPP") : <span>Pick a date</span>}
      //     </Button>
      //   </PopoverTrigger>
      //   <PopoverContent className="w-auto p-0">
         
      //   </PopoverContent>
      // </Popover>
  );
}
