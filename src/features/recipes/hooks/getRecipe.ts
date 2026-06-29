"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../actions/getRecipe";

export function useGetRecipe(id: string) {
  const { data } = useQuery({
    queryKey: ["recipes", id],
    queryFn: () => getRecipe(id),
  });

  return data ?? null;
}
