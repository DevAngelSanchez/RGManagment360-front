import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" className="flex items-center justify-center gap-1" >
        <IconBrandGoogle size={16} />
        Google
      </Button>
    </form>
  )
}