"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Recipe } from "../types";
import { mapRecipe, RecipeRow, RECIPE_SELECT } from "../utils/mapRecipe";

export async function getRecipe(id: string): Promise<Recipe | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_SELECT)
    .eq("id", id)
    .single();

  if (error) return null;
  return mapRecipe(data as RecipeRow);
}
