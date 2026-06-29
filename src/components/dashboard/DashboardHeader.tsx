import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import getUser from "@/features/auth/actions/getUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export async function DashboardHeader() {
  const user = await getUser().catch(() => null);
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "?";

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-background sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-5" />
      </div>

      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-muted-foreground hidden sm:block">
          {user?.user_metadata.username ?? user?.email}
        </span>
      </div>
    </header>
  );
}
