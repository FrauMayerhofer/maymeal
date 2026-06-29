"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { MealSlot, WeekDay, WeekPlan } from "../types";
import { mapRecipe, RecipeRow, RECIPE_SELECT } from "../utils/mapRecipe";

export async function getMealPlan(weekDays: WeekDay[]): Promise<WeekPlan> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const isoDates = weekDays.map((d) => d.isoDate);

  type MealPlanEntry = {
    date: string;
    slot: MealSlot;
    recipes: RecipeRow | null;
  };

  const { data, error } = (await supabase
    .from("meal_plans")
    .select(`date, slot, recipes ( ${RECIPE_SELECT} )`)
    .in("date", isoDates)) as unknown as {
    data: MealPlanEntry[] | null;
    error: { message: string } | null;
  };

  if (error) throw new Error(error.message);

  // Build an isoDate → dayName lookup
  const dateToName = Object.fromEntries(
    weekDays.map((d) => [d.isoDate, d.name]),
  );

  // Initialize empty plan for every day
  const plan: WeekPlan = Object.fromEntries(
    weekDays.map((d) => [
      d.name,
      { Frühstück: [], Mittagessen: [], Abendessen: [] } as Record<
        MealSlot,
        ReturnType<typeof mapRecipe>[]
      >,
    ]),
  );

  for (const entry of data ?? []) {
    const dayName = dateToName[entry.date];
    if (!dayName || !entry.recipes) continue;
    const recipe = mapRecipe(entry.recipes);
    plan[dayName][entry.slot].push(recipe);
  }

  return plan;
}
