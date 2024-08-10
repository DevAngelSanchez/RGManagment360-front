import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type AvatarProps = {
  name: string | null | undefined;
}

export const UserAvatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  )
}
