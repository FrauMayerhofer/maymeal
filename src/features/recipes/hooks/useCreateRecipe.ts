"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRecipe } from "../actions/createRecipe";
import { updateRecipeImageUrl } from "../actions/updateRecipeImageUrl";
import { RecipePayload } from "../schemas/recipe";
import { createClient } from "@/lib/supabase/client";
import { uploadRecipeImage } from "../utils/uploadRecipeImage";

export function useCreateRecipe() {
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
        return createRecipe(payload);
      }

      const supabase = createClient();
      const recipe = await createRecipe({ ...payload, imageUrl: null });
      const url = await uploadRecipeImage(supabase, recipe.id, imageFile);
      await updateRecipeImageUrl(recipe.id, url);
      return { ...recipe, imageUrl: url };
    },
    onSuccess: (recipe) => {
      toast.success("Rezept erstellt!");
      router.push(`/recipes/${recipe.id}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
