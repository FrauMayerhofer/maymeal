"use client";

import { RecipeForm } from "../forms/RecipeForm";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { RecipePayload } from "../schemas/recipe";

export function NewRecipeForm() {
  const { mutate, isPending } = useCreateRecipe();

  function handleSubmit(payload: RecipePayload, imageFile: File | null) {
    mutate({ payload, imageFile });
  }

  return (
    <RecipeForm
      onSubmit={handleSubmit}
      isPending={isPending}
      submitLabel="Rezept erstellen"
    />
  );
}
