"use client";

import { useState } from "react";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/features/recipes/types";
import type { WeekDay, WeekPlan } from "../types";
import type { useMealPlan } from "../hooks/useMealPlan";

const SHUFFLE_CATEGORIES = new Set(["Mittagessen", "Abendessen"]);

interface ShuffleLunchDialogProps {
  weekDays: WeekDay[];
  weekLabel: string;
  plan: WeekPlan;
  recipes: Recipe[];
  add: ReturnType<typeof useMealPlan>["add"];
  remove: ReturnType<typeof useMealPlan>["remove"];
}

export function ShuffleLunchDialog({
  weekDays,
  weekLabel,
  plan,
  recipes,
  add,
  remove,
}: ShuffleLunchDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
  const [isShuffling, setIsShuffling] = useState(false);

  const eligibleRecipes = recipes.filter((r) =>
    SHUFFLE_CATEGORIES.has(r.category),
  );

  const toggleDay = (dayName: string) => {
    setSelectedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayName)) {
        next.delete(dayName);
      } else {
        next.add(dayName);
      }
      return next;
    });
  };

  const shuffleLunches = async () => {
    if (eligibleRecipes.length === 0) return;
    setIsShuffling(true);
    try {
      for (const day of weekDays) {
        if (!selectedDays.has(day.name)) continue;
        const existing = plan[day.name]?.["Mittagessen"] ?? [];
        for (const recipe of existing) {
          await remove.mutateAsync({
            isoDate: day.isoDate,
            slot: "Mittagessen",
            recipeId: recipe.id,
          });
        }
        const randomRecipe =
          eligibleRecipes[Math.floor(Math.random() * eligibleRecipes.length)];
        await add.mutateAsync({
          isoDate: day.isoDate,
          slot: "Mittagessen",
          recipeId: randomRecipe.id,
        });
      }
      setOpen(false);
    } finally {
      setIsShuffling(false);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedDays(new Set());
            setOpen(true);
          }}
        >
          <Shuffle className="size-4" />
          Mittagessen auswürfeln
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shuffle className="size-5" />
              Mittagessen auswürfeln
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Wähle die Tage für die Woche {weekLabel}, für die ein zufälliges
            Mittagessen ausgewählt werden soll. Ein bereits geplantes
            Mittagessen wird dabei ersetzt.
          </p>
          <div className="flex flex-col gap-1.5">
            {weekDays.map((day) => (
              <button
                key={day.name}
                type="button"
                onClick={() => toggleDay(day.name)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors",
                  selectedDays.has(day.name)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40",
                )}
              >
                <span className="font-medium">{day.name}</span>
                <span className="text-xs">{day.date}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isShuffling}
            >
              Abbrechen
            </Button>
            <Button
              onClick={shuffleLunches}
              disabled={isShuffling || selectedDays.size === 0}
            >
              <Shuffle className="size-4" />
              {isShuffling ? "Würfle…" : "Würfeln"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
