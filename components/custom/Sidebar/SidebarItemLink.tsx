'use client'

import Link from "next/link";

export default function SidebarItemLink({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link href={href} className='flex items-center gap-2 p-2 rounded-lg text-sm font-semibold hover:bg-green-100 hover:pl-4 transition-all'>
      {children}
    </Link>
  )
}