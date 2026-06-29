"use client";

import { Fragment, useState } from "react";
import { Plus, X, ChefHat, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlannerRecipeCard } from "./PlannerRecipeCard";
import { RecipeImage } from "./RecipeImage";
import { MEAL_SLOTS } from "../data/mock-data";
import type { MealSlot } from "../types";
import {
  DAY_NAMES,
  getISOWeekNumber,
  getMondayOfWeek,
  getWeekDays,
} from "../utils/formatDate";
import { useMealPlan } from "../hooks/useMealPlan";
import { useGetRecipes } from "../hooks/getRecipes";
import Link from "next/link";

function getTodayDayIndex() {
  const day = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  return day === 0 ? 6 : day - 1; // Mon=0, ..., Sun=6
}

export function WeeklyPlanner() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayIndex, setDayIndex] = useState(getTodayDayIndex);
  const [selectingFor, setSelectingFor] = useState<{
    day: string;
    slot: MealSlot;
  } | null>(null);

  const weekDays = getWeekDays(weekOffset);
  const monday = getMondayOfWeek(weekOffset);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const weekNum = getISOWeekNumber(monday);
  const weekKey = `${monday.getFullYear()}-W${weekNum}`;

  const weekLabel = `KW ${weekNum} · ${monday.toLocaleDateString("de-DE", { day: "numeric", month: "short" })} – ${sunday.toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" })}`;

  const { plan, add, remove } = useMealPlan(weekKey, weekDays);
  const allRecipes = useGetRecipes();

  const currentDay = weekDays[dayIndex];

  const goToPrevDay = () => {
    if (dayIndex > 0) {
      setDayIndex((d) => d - 1);
    } else {
      setWeekOffset((w) => w - 1);
      setDayIndex(6);
    }
  };

  const goToNextDay = () => {
    if (dayIndex < 6) {
      setDayIndex((d) => d + 1);
    } else {
      setWeekOffset((w) => w + 1);
      setDayIndex(0);
    }
  };

  const addRecipe = (recipeId: string) => {
    if (!selectingFor) return;
    const day = weekDays.find((d) => d.name === selectingFor.day);
    if (!day) return;
    add.mutate({ isoDate: day.isoDate, slot: selectingFor.slot, recipeId });
    setSelectingFor(null);
  };

  const removeRecipe = (dayName: string, slot: MealSlot, recipeId: string) => {
    const day = weekDays.find((d) => d.name === dayName);
    if (!day) return;
    remove.mutate({ isoDate: day.isoDate, slot, recipeId });
  };

  const totalCalories = Object.values(plan).reduce(
    (daySum, slots) =>
      daySum +
      Object.values(slots).reduce(
        (slotSum, recipes) =>
          slotSum + recipes.reduce((s, r) => s + r.calories, 0),
        0,
      ),
    0,
  );

  const plannedMeals = Object.values(plan).reduce(
    (sum, slots) =>
      sum + Object.values(slots).filter((r) => r.length > 0).length,
    0,
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Week nav — desktop only */}
        <div className="hidden md:flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{weekLabel}</p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset((w) => w - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            {weekOffset !== 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWeekOffset(0)}
              >
                Heute
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset((w) => w + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Card size="sm">
            <CardContent className="flex flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">
                Geplante Mahlzeiten
              </p>
              <p className="text-2xl font-bold">{plannedMeals}</p>
              <p className="text-xs text-muted-foreground">
                von {DAY_NAMES.length * MEAL_SLOTS.length} möglich
              </p>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardContent className="flex flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">Kcal diese Woche</p>
              <p className="text-2xl font-bold">
                {totalCalories.toLocaleString("de")}
              </p>
              <p className="text-xs text-muted-foreground">
                Ø {Math.round(totalCalories / 7)} kcal / Tag
              </p>
            </CardContent>
          </Card>
          <Card size="sm" className="col-span-2 sm:col-span-1">
            <CardContent className="flex flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">Freie Slots</p>
              <p className="text-2xl font-bold">
                {DAY_NAMES.length * MEAL_SLOTS.length - plannedMeals}
              </p>
              <p className="text-xs text-muted-foreground">noch zu planen</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile single-day view */}
        <div className="md:hidden flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={goToPrevDay}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="text-center">
              <p className="font-semibold">
                {currentDay?.name}, {currentDay?.date}
              </p>
              <p className="text-xs text-muted-foreground">{weekLabel}</p>
            </div>
            <Button variant="outline" size="icon" onClick={goToNextDay}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {MEAL_SLOTS.map((slot, slotIdx) => {
            const recipes = plan[currentDay?.name]?.[slot] ?? [];
            return (
              <Fragment key={slot}>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {slot}
                  </p>
                  <div className="flex flex-col gap-1">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="relative flex items-center gap-1.5 rounded-lg bg-muted/60 px-2 py-1.5 ring-1 ring-border"
                      >
                        <RecipeImage
                          imageUrl={recipe.imageUrl}
                          alt={recipe.title}
                          className="size-5 rounded shrink-0"
                          iconSize="sm"
                        />
                        <Link
                          className="flex-1 truncate text-xs font-medium leading-tight"
                          href={`/recipes/${recipe.id}`}
                        >
                          {recipe.title}
                        </Link>
                        <button
                          onClick={() =>
                            removeRecipe(currentDay.name, slot, recipe.id)
                          }
                          className="rounded p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setSelectingFor({ day: currentDay.name, slot })
                      }
                      className={`flex w-full items-center justify-center rounded-lg border border-dashed border-border/60 text-muted-foreground/40 transition-colors hover:border-primary/40 hover:text-primary/60 ${recipes.length > 0 ? "min-h-7 py-1" : "min-h-16"}`}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
                {slotIdx < MEAL_SLOTS.length - 1 && <Separator />}
              </Fragment>
            );
          })}
        </div>

        {/* Desktop week view */}
        <div className="hidden md:block">
          <ScrollArea className="w-full">
            <div className="min-w-175">
              <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] gap-5 overflow-x-scroll">
                <div />
                {weekDays.map((day) => (
                  <div key={day.name} className="text-center">
                    <p className="text-xs font-semibold text-foreground">
                      {day.short}
                    </p>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                  </div>
                ))}

                {MEAL_SLOTS.map((slot, slotIdx) => (
                  <Fragment key={slot}>
                    <div className="flex items-start pt-1">
                      <span className="text-xs font-medium text-muted-foreground leading-tight">
                        {slot}
                      </span>
                    </div>
                    {weekDays.map((day) => {
                      const recipes = plan[day.name]?.[slot] ?? [];
                      return (
                        <div
                          key={`${day.name}-${slot}`}
                          className="flex flex-col gap-2"
                        >
                          {recipes.map((recipe) => (
                            <div
                              key={recipe.id}
                              className="group relative flex items-center gap-1.5 rounded-lg bg-muted/60 px-2 py-1.5 ring-1 ring-border"
                            >
                              <RecipeImage
                                imageUrl={recipe.imageUrl}
                                alt={recipe.title}
                                className="size-5 rounded shrink-0"
                                iconSize="sm"
                              />
                              <Link
                                className="flex-1 truncate text-xs font-medium leading-tight"
                                href={`/recipes/${recipe.id}`}
                              >
                                {recipe.title}
                              </Link>
                              <button
                                onClick={() =>
                                  removeRecipe(day.name, slot, recipe.id)
                                }
                                className="absolute right-1 top-1 hidden rounded p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group-hover:flex"
                              >
                                <X className="size-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() =>
                              setSelectingFor({ day: day.name, slot })
                            }
                            className={`flex w-full items-center justify-center rounded-lg border border-dashed border-border/60 text-muted-foreground/40 transition-colors hover:border-primary/40 hover:text-primary/60 ${recipes.length > 0 ? "min-h-7 py-1" : "min-h-16"}`}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      );
                    })}
                    {slotIdx < MEAL_SLOTS.length - 1 && (
                      <div className="col-span-8 my-1">
                        <Separator />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <Dialog
        open={!!selectingFor}
        onOpenChange={(o) => !o && setSelectingFor(null)}
      >
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="size-5" />
              Rezept auswählen für{" "}
              {selectingFor && `${selectingFor.day} · ${selectingFor.slot}`}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allRecipes.map((recipe) => (
              <PlannerRecipeCard
                key={recipe.id}
                recipe={recipe}
                onAdd={(r) => addRecipe(r.id)}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
