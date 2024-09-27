"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  onChange: (date: Date | undefined) => void; // Prop para manejar el cambio
}

export function MainDatePicker({ onChange }: Props) {
  const [date, setDate] = React.useState<Date>()
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    onChange(selectedDate) // Llamamos a onChange con la fecha seleccionada
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect} // Usamos handleSelect para manejar la selección
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
