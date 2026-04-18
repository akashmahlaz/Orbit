"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SignOut() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="cursor-pointer gap-2 text-muted-foreground hover:text-foreground"
      onClick={() => signOut()}
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  )
}