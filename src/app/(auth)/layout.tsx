import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col bg-primary p-12 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ChefHat className="h-7 w-7" />
          MAYMeal
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Kochen mit Leidenschaft
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Entdecke tausende Rezepte, plane deine Woche und generiere
            automatisch deine Einkaufsliste. Alles an einem Ort.
          </p>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          © 2026 MAYMeal. Alle Rechte vorbehalten.
        </p>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
