"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { editRecipe } from "../actions/editRecipe";
import { RecipePayload } from "../schemas/recipe";
import { createClient } from "@/lib/supabase/client";
import { uploadRecipeImage } from "../utils/uploadRecipeImage";

export function useEditRecipe(id: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      payload,
      imageFile,
    }: {
      payload: RecipePayload;
      imageFile: File | null;
    }) => {
      if (!imageFile) {
        return editRecipe(id, payload);
      }

      const supabase = createClient();
      const url = await uploadRecipeImage(supabase, id, imageFile);
      return editRecipe(id, { ...payload, imageUrl: url });
    },
    onSuccess: () => {
      toast.success("Rezept gespeichert!");
      router.push(`/recipes/${id}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
