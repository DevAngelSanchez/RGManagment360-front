"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '@/lib/types';
import dayjs from "dayjs";
import { apiUrl } from '@/auth.config';

interface Props {
  accessToken?: string;
}


const MyCalendar: React.FC<Props> = ({ accessToken }) => {

  const [events, setEvents] = useState<any[]>([]); // Usa el tipo adecuado

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
        console.log(formattedEvents)

        setEvents(formattedEvents); // Asegúrate de que `data.events` es el formato esperado
      }
    };

    fetchEvents();
  }, []);

  console.log(events)

  const localizer = dayjsLocalizer(dayjs);

  return (
    <div className='w-full h-[600px]'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
      />
    </div>
  );
};

export default MyCalendar;
