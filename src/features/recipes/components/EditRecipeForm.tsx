"use client";

import { Recipe } from "../types";
import { RecipeForm } from "../forms/RecipeForm";
import { useEditRecipe } from "../hooks/useEditRecipe";
import { RecipePayload } from "../schemas/recipe";
import { toFormDefaults } from "../utils/formatDefaults";

interface EditRecipeFormProps {
  recipe: Recipe;
}

export function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const { mutate, isPending } = useEditRecipe(recipe.id);

  function handleSubmit(payload: RecipePayload, imageFile: File | null) {
    mutate({ payload, imageFile });
  }

  return (
    <RecipeForm
      defaultValues={toFormDefaults(recipe)}
      onSubmit={handleSubmit}
      isPending={isPending}
      submitLabel="Änderungen speichern"
    />
  );
}
