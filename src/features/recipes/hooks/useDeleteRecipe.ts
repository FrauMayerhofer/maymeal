"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteRecipe } from "../actions/deleteRecipe";

export function useDeleteRecipe() {
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => deleteRecipe(id),
    onSuccess: () => {
      toast.success("Rezept gelöscht.");
      router.push("/recipes");
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
