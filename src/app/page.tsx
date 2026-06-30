import Link from "next/link";
import { CalendarDays, BookOpen, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import getUser from "@/features/auth/actions/getUser";
import { HomeHeader } from "@/components/home/Header";

export default async function Home() {
  const user = await getUser().catch(() => null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HomeHeader user={user} />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Kochen mit Leidenschaft
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Sammle deine Lieblingsrezepte, plane deine Woche und behalte den
            Überblick — alles an einem Ort.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href={ROUTES.register}>Kostenlos starten</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={ROUTES.login}>Bereits registriert?</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/40">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="mb-12 text-center text-2xl font-bold">
              Alles, was du brauchst
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="size-6" />
                </div>
                <h3 className="font-semibold">Rezeptsammlung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Füge eigene Rezepte hinzu, kategorisiere sie und durchsuche
                  sie blitzschnell.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarDays className="size-6" />
                </div>
                <h3 className="font-semibold">Wochenplanung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plane Frühstück, Mittag und Abendessen für jede Woche und
                  behalte Kalorien im Blick.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShoppingCart className="size-6" />
                </div>
                <h3 className="font-semibold">Einkaufsliste</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Generiere automatisch eine Einkaufsliste aus deinem Wochenplan
                  — kein Vergessen mehr.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-muted-foreground">
          © 2026 MAYMeal. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}
