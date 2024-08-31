import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { IconRocket } from "@tabler/icons-react";

interface Props {
  title: string;
  msg: string;
  show: boolean;
}

export default function AlertComponent({ title, msg, show }: Props) {

  if (!show) return null;

  return (
    <Alert>
      <IconRocket size={16} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {msg}
      </AlertDescription>
    </Alert>
  )
}