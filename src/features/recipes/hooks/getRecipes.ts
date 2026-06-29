"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../actions/getRecipes";

export function useGetRecipes() {
  const { data } = useQuery({ queryKey: ["recipes"], queryFn: getRecipes });

  return data ?? [];
}
