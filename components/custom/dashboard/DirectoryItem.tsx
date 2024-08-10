import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { IconBrandWhatsapp } from "@tabler/icons-react";

type DirectoryItemProps = {
  name: string;
  email: string;
  phone: string;
}

const DirectoryItem: React.FC<DirectoryItemProps> = ({ name, email, phone }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-4">
        <UserAvatar name={name} />
        <div className="flex flex-col justify-center">
          <h4 className="font-semibold">{name}</h4>
          <a href={`mailto:${email}`} className="text-xs text-gray-500 hover:text-primary transition-all">{email}</a>
        </div>
      </div>
      <div>
        <a href={`tel:${phone}`}>
          <Button className="gap-1">
            <IconBrandWhatsapp />
            Contact
          </Button>
        </a>
      </div>
    </div>
  )
}

export default DirectoryItem