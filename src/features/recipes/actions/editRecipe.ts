"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { RecipePayload } from "../schemas/recipe";
import { Recipe } from "../types";
import { mapRecipe, RecipeRow, RECIPE_SELECT } from "../utils/mapRecipe";

export async function editRecipe(
  id: string,
  payload: RecipePayload,
): Promise<Recipe> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const { error: updateError } = await supabase
    .from("recipes")
    .update({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      difficulty: payload.difficulty,
      duration: payload.duration,
      servings: payload.servings,
      calories: payload.calories,
      protein: payload.macros.protein,
      carbs: payload.macros.carbs,
      fat: payload.macros.fat,
      image_url: payload.imageUrl,
    })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);

  // Delete all related rows and re-insert
  await Promise.all([
    supabase.from("ingredients").delete().eq("recipe_id", id),
    supabase.from("instructions").delete().eq("recipe_id", id),
    supabase.from("recipe_tags").delete().eq("recipe_id", id),
  ]);

  await Promise.all([
    payload.ingredients.length > 0
      ? supabase.from("ingredients").insert(
          payload.ingredients.map((ing, i) => ({
            recipe_id: id,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            section: ing.section ?? null,
            position: i,
          })),
        )
      : Promise.resolve(),

    payload.instructions.length > 0
      ? supabase.from("instructions").insert(
          payload.instructions.map((content, i) => ({
            recipe_id: id,
            step_number: i + 1,
            content,
          })),
        )
      : Promise.resolve(),

    payload.tags.length > 0
      ? supabase
          .from("recipe_tags")
          .insert(payload.tags.map((tag) => ({ recipe_id: id, tag })))
      : Promise.resolve(),
  ]);

  const { data: full, error: fullError } = await supabase
    .from("recipes")
    .select(RECIPE_SELECT)
    .eq("id", id)
    .single();

  if (fullError) throw new Error(fullError.message);
  return mapRecipe(full as RecipeRow);
}
