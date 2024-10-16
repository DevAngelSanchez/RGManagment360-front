"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  dayjsLocalizer,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { apiUrl } from "@/auth.config";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import "./index.css";
import { CreateTaskForm } from "./form";
import { EditTaskForm } from "./editTaskForm";

interface Props {
  accessToken: string;
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
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const MyCalendar: React.FC<Props> = ({ accessToken }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedTask, setSelectedTask] = useState(undefined);

  const [newEvent, setNewEvent] = useState<Event>({
    id: "",
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({ ...newEvent, start: slotInfo.start, end: slotInfo.end });
    setSelectedDate(slotInfo.start.toISOString());
    setDialogOpen(true);
  };

  const handleSelectEvent = async (event: any) => {
    setSelectedEvent(event);
    setDialogOpen(true);
    const taskId = event.data.extendedProperties?.private?.taskId;

    if (taskId) {
      try {
        // Llama a tu API para obtener la tarea asociada
        const response = await fetch(`${apiUrl}api/task`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: taskId
          })
        });

        if (response.ok) {
          const taskData = await response.json();
          setSelectedTask(taskData);
        } else {
          console.error('Error fetching task:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    }
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

        // Validación para asegurar que data.formatedEvents existe y es un array
        const formattedEvents = Array.isArray(data?.formatedEvents)
          ? data.formatedEvents.map((event: any) => ({
            ...event,
            start: event.allDay ? new Date(event.end) : new Date(event.start), // Convertir a objeto Date
            end: new Date(event.end), // Convertir a objeto Date
          }))
          : [];

        setEvents(formattedEvents); // Si formatedEvents es undefined o no es array, usará []
      }
    };

    fetchEvents();
  }, [accessToken]);

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
        onSelectEvent={handleSelectEvent}
        className="bg-white rounded-lg shadow-md"
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white rounded-lg">
          <DialogTitle className="text-lg font-bold mb-2">
            {selectedEvent ? "Editar tarea" : "Crear tarea"}
          </DialogTitle>
          {selectedEvent ? <EditTaskForm selectedDate={selectedDate} accessToken={accessToken} task={selectedTask} /> :
            <CreateTaskForm selectedDate={selectedDate} accessToken={accessToken} />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
