"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { MealSlot } from "../types";

export async function removeMealPlanEntry(
  isoDate: string,
  slot: MealSlot,
  recipeId: string,
): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const { error } = await supabase
    .from("meal_plans")
    .delete()
    .eq("date", isoDate)
    .eq("slot", slot)
    .eq("recipe_id", recipeId);

  if (error) throw new Error(error.message);
}
