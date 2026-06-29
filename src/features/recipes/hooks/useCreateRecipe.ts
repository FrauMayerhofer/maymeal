"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRecipe } from "../actions/createRecipe";
import { RecipePayload } from "../schemas/recipe";

export function useCreateRecipe() {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: RecipePayload) => createRecipe(payload),
    onSuccess: (recipe) => {
      toast.success("Rezept erstellt!");
      router.push(`/recipes/${recipe.id}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
