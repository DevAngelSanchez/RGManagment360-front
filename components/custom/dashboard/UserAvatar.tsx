import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type AvatarProps = {
  name: string | null | undefined;
  image: string | null | undefined;
}

export const UserAvatar: React.FC<AvatarProps> = ({ name, image }) => {
  console.log("Image: ", image)
  return (
    <Avatar>
      <AvatarImage src={image ? image : "https://github.com/shadcn.png"} alt="Profile Picture" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  )
}
