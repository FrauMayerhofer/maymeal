import { Recipe } from "../recipes/types";

export type MealSlot = "Frühstück" | "Mittagessen" | "Abendessen";

export interface WeekDay {
  name: string;
  short: string;
  date: string;
  isoDate: string; // YYYY-MM-DD, used for DB queries
}

export type WeekPlan = Record<string, Record<MealSlot, Recipe[]>>;
