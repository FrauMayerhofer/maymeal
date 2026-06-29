"use client";

import { RecipeForm } from "../forms/RecipeForm";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { RecipePayload } from "../schemas/recipe";

export function NewRecipeForm() {
  const { mutate, isPending } = useCreateRecipe();

  function handleSubmit(payload: RecipePayload, _imageFile: File | null) {
    // TODO: upload _imageFile to Supabase Storage, then set payload.imageUrl
    mutate(payload);
  }

  return (
    <RecipeForm
      onSubmit={handleSubmit}
      isPending={isPending}
      submitLabel="Rezept erstellen"
    />
  );
}
