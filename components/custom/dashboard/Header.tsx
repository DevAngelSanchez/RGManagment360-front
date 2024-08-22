"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";

type HeaderProps = {
  name?: string | null | undefined;
  email?: string | null | undefined;
};

export default function Header({ name, email }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-300 flex items-center justify-between gap-2 px-6 py-6 bg-gradient-to-r from-green-500 to-teal-400">
      <div className="flex items-center gap-8">
        <h2 className="font-semibold">{email}</h2>
        <nav>
          <ul className="flex items-center gap-4">
            <Link
              className="font-semibold hover:text-primary transition-all"
              href="/dashboard"
            >
              Overview
            </Link>
            <Link
              className="font-semibold hover:text-primary transition-all"
              href="/dashboard/clients"
            >
              Clients
            </Link>
            <Link
              className="font-semibold hover:text-primary transition-all"
              href="/dashboard/properties"
            >
              Properties
            </Link>
          </ul>
        </nav>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-0 rounded-full">
            <UserAvatar name={name} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={() => signOut()}>Sign out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
