"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Recipe } from "../types";
import { mapRecipe, RecipeRow, RECIPE_SELECT } from "../utils/mapRecipe";

export async function getRecipes(): Promise<Recipe[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as RecipeRow[]).map(mapRecipe);
}
