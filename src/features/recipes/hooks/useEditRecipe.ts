"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editRecipe } from "../actions/editRecipe";
import { RecipePayload } from "../schemas/recipe";

export function useEditRecipe(id: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: RecipePayload) => editRecipe(id, payload),
    onSuccess: () => {
      toast.success("Rezept gespeichert!");
      router.push(`/recipes/${id}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
