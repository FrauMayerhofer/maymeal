"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { RecipePayload } from "../schemas/recipe";
import { Recipe } from "../types";
import { mapRecipe, RecipeRow, RECIPE_SELECT } from "../utils/mapRecipe";

export async function createRecipe(payload: RecipePayload): Promise<Recipe> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const { data: recipe, error: recipeError } = await supabase
    .from("recipes")
    .insert({
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
      author_id: user.id,
      author_name: user.user_metadata.name ?? user.email,
    })
    .select("id")
    .single();

  if (recipeError) throw new Error(recipeError.message);

  const id = recipe.id;

  const [ingredientsResult, instructionsResult, tagsResult] = await Promise.all(
    [
      payload.ingredients.length > 0
        ? supabase.from("ingredients").insert(
            payload.ingredients.map((ing, i) => ({
              recipe_id: id,
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
              position: i,
            })),
          )
        : Promise.resolve({ error: null }),

      payload.instructions.length > 0
        ? supabase.from("instructions").insert(
            payload.instructions.map((content, i) => ({
              recipe_id: id,
              step_number: i + 1,
              content,
            })),
          )
        : Promise.resolve({ error: null }),

      payload.tags.length > 0
        ? supabase
            .from("recipe_tags")
            .insert(payload.tags.map((tag) => ({ recipe_id: id, tag })))
        : Promise.resolve({ error: null }),
    ],
  );

  if (ingredientsResult.error) throw new Error(ingredientsResult.error.message);
  if (instructionsResult.error)
    throw new Error(instructionsResult.error.message);
  if (tagsResult.error) throw new Error(tagsResult.error.message);

  const { data: full, error: fullError } = await supabase
    .from("recipes")
    .select(RECIPE_SELECT)
    .eq("id", id)
    .single();

  if (fullError) throw new Error(fullError.message);
  return mapRecipe(full as RecipeRow);
}
