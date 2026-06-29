"use client";

import { ChefHat, CalendarDays, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { WeeklyPlanner } from "@/features/recipes/components/WeeklyPlanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ChefHat className="size-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none">MayMeal</h1>
              <p className="text-xs text-muted-foreground">
                Deine Rezepte & Wochenplanung
              </p>
            </div>
          </div>
          <Avatar className="size-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
              AM
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">f</main>
    </div>
  );
}
