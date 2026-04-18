import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function DashboardHeader({ user }: { user: { name?: string | null; image?: string | null } }) {
  return (
    <header className="shrink-0">
      <div className="flex h-14 items-center justify-between px-6">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            Welcome back,
          </h2>
          <p className="text-base font-semibold">{user.name ?? "User"}</p>
        </div>
        <Avatar className="size-8">
          {user.image && <AvatarImage src={user.image} alt={user.name ?? ""} />}
          <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
      </div>
      <Separator />
    </header>
  )
}
