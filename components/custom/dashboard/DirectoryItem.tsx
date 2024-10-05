import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Category, Subcategory } from "@/lib/types";

type Props = {
  name: string;
  email: string;
  phone?: string;
  category?: Category[];
  subcategory?: Subcategory[];
}

const DirectoryItem: React.FC<Props> = ({ name, email, phone, category, subcategory }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6 ">
      <div className="flex items-center gap-4">
        <UserAvatar name={name} />
        <div className="flex flex-col justify-center">
          <h4 className="font-semibold">{name}</h4>
          <a href={`mailto:${email}`} className="mt-2 text-xs text-gray-500 hover:text-primary transition-all">{email}</a>
          {category && subcategory && (
            <div className="flex items-center gap-2 mt-2">
              <span className="rounded-full p-1 px-2 text-[12px] font-semibold bg-green-300">{category[0].name}</span>
              <span className="rounded-full p-1 px-2 text-[12px] font-semibold bg-red-300">{subcategory[0].name}</span>
            </div>
          )}
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