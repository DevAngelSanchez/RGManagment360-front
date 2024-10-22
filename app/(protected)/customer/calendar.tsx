"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  dayjsLocalizer,
  momentLocalizer,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import { Event } from '@/lib/types';
import moment from "moment";
import dayjs from "dayjs";
import { apiUrl } from "@/auth.config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./index.css";
import { CreateTaskForm } from "./form";

interface Props {
  accessToken?: string;
}
const calendarStyles = {
  calendarContainer: "bg-gray-100 p-4",
  event: "bg-blue-500 text-white rounded-lg p-2 mb-2 hover:bg-blue-600",
  dialogContent: "bg-white p-4 rounded-lg",
  dialogTitle: "text-lg font-bold mb-4",
  dialogInput: "w-full p-2 border border-gray-300 rounded mb-4",
  dialogButton: "bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer",
};

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC<Props> = ({ accessToken }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({ ...newEvent, start: slotInfo.start, end: slotInfo.end });
    setDialogOpen(true);
  };

  const handleSaveEvent = () => {
    const updatedEvents = Array.isArray(events) ? events : [];
    setEvents([...updatedEvents, newEvent]);
    setNewEvent({ title: "", start: new Date(), end: new Date() }); // Reset newEvent state
    setDialogOpen(false);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (accessToken) {
        const response = await fetch(`${apiUrl}api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: accessToken,
          }),
        });

        const data = await response.json();

        const formattedEvents = data.formatedEvents.map((event: any) => ({
          ...event,
          start: event.allDay ? new Date(event.end) : new Date(event.start),  // Convertir a objeto Date
          end: new Date(event.end),      // Convertir a objeto Date
        }));

        setEvents(formattedEvents); // Asegúrate de que `data.events` es el formato esperado
      }
    };

    fetchEvents();
  }, []);

  const localizer = dayjsLocalizer(dayjs);

  return (
    <div className="w-full h-[600px] p-4 bg-gray-100 rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        className="bg-white rounded-lg shadow-md"
      />
      {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="bg-white rounded-lg">
          <DialogTitle className="text-lg font-bold mb-4 px-3">
            Add task.
          </DialogTitle>
          <DialogDescription>
            <Input
              type="text"
              placeholder="Título del evento"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <Button
              onClick={handleSaveEvent}
              className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Save
            </Button>
            <CreateTaskForm />
          </DialogDescription>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

export default MyCalendar;
