import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { IconRocket } from "@tabler/icons-react";

interface Props {
  title: string;
  msg: string;
  type: string;
  show: boolean;
}

export default function AlertComponent({ title, msg, type, show }: Props) {

  if (!show) return null;

  let variant: "default" | "destructive" | "success" | "info" | null | undefined = "default";

  switch (type) {
    case "error":
      variant = "destructive";
      break;
    case "success":
      variant = "success";
      break;
    case "info":
      variant = "info";
      break;
    default:
      variant = "default";
      break;
  }

  return (
    <Alert variant={variant}>
      {/* <IconRocket size={16} /> */}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {msg}
      </AlertDescription>
    </Alert>
  )
}