"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { UserAvatar } from "./UserAvatar";
import LogoutButton from "../LogoutButton";

type HeaderProps = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export default function Header({ name, email, image }: HeaderProps) {

  const handleClick = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login"
    })
  }

  return (
    <header className="w-full border-b border-gray-300 flex items-center justify-between gap-2 px-6 py-6 bg-gradient-to-r from-green-500 to-teal-400">
      <div className="flex items-center gap-2">
        <Button variant="outline" className="p-0 rounded-full">
          <UserAvatar image={image} name={name} />
        </Button>
        <h2 className=" text-gray-800 font-bold text-2xl">{name}</h2>
      </div>
      <LogoutButton handleClick={handleClick} />
    </header>
  );
}
