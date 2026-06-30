"use server";

import { getMealPlan } from "@/features/planner/actions/getMealPlan";
import { Ingredient } from "@/features/recipes/types";
import { getWeekDays } from "@/features/planner/utils/formatDate";

export type ImportedIngredient = {
  name: string;
  amount: number;
  unit: string;
};

export async function getIngredientsFromMealPlan(): Promise<
  ImportedIngredient[]
> {
  const weekDays = getWeekDays(0);
  const plan = await getMealPlan(weekDays);

  const merged = new Map<string, { amount: number; unit: string }>();

  for (const slots of Object.values(plan)) {
    for (const recipes of Object.values(slots)) {
      for (const recipe of recipes) {
        for (const ing of recipe.ingredients as Ingredient[]) {
          const key = `${ing.name.toLowerCase()}||${ing.unit.toLowerCase()}`;
          const existing = merged.get(key);
          if (existing) {
            existing.amount += ing.amount;
          } else {
            merged.set(key, { amount: ing.amount, unit: ing.unit });
          }
        }
      }
    }
  }

  return Array.from(merged.entries()).map(([key, { amount, unit }]) => {
    const rawName = key.split("||")[0];
    return {
      name: rawName.charAt(0).toUpperCase() + rawName.slice(1),
      amount,
      unit,
    };
  });
}
