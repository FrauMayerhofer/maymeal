"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addMealPlanEntry } from "../actions/addMealPlanEntry";
import { getMealPlan } from "../actions/getMealPlan";
import { removeMealPlanEntry } from "../actions/removeMealPlanEntry";
import { MealSlot, WeekDay, WeekPlan } from "../types";

function makeEmptyPlan(weekDays: WeekDay[]): WeekPlan {
  return Object.fromEntries(
    weekDays.map((d) => [
      d.name,
      { Frühstück: [], Mittagessen: [], Abendessen: [] },
    ]),
  );
}

export function useMealPlan(weekKey: string, weekDays: WeekDay[]) {
  const qc = useQueryClient();

  const { data: plan = makeEmptyPlan(weekDays) } = useQuery({
    queryKey: ["meal-plan", weekKey],
    queryFn: () => getMealPlan(weekDays),
  });

  const add = useMutation({
    mutationFn: ({
      isoDate,
      slot,
      recipeId,
    }: {
      isoDate: string;
      slot: MealSlot;
      recipeId: string;
    }) => addMealPlanEntry(isoDate, slot, recipeId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["meal-plan", weekKey] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: ({
      isoDate,
      slot,
      recipeId,
    }: {
      isoDate: string;
      slot: MealSlot;
      recipeId: string;
    }) => removeMealPlanEntry(isoDate, slot, recipeId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["meal-plan", weekKey] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return { plan, add, remove };
}
