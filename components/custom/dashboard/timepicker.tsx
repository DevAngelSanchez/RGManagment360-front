import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface Props {
  label: string
}

export default function MyTimepicker({ label }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <div>
        <TimePicker label={label} />
      </div>
    </LocalizationProvider>
  )
}