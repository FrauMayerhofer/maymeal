import { ChefHat } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};
export const HomeHeader = ({ user }: Props) => {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ChefHat className="size-4" />
          </div>
          <span className="font-bold text-lg">MAYMeal</span>
        </div>
        {user ? (
          <Button asChild>
            <Link href={ROUTES.afterLogin}>Dashboard</Link>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href={ROUTES.login}>Anmelden</Link>
            </Button>
            <Button asChild>
              <Link href={ROUTES.register}>Registrieren</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
