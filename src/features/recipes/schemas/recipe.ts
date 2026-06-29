import * as z from "zod";
import { Recipe } from "../types";

export const recipeFormSchema = z.object({
  imageUrl: z.string().nullable(),
  title: z.string().min(2, "Min. 2 Zeichen"),
  description: z.string().min(10, "Min. 10 Zeichen"),
  category: z.enum([
    "Frühstück",
    "Mittagessen",
    "Abendessen",
    "Snack",
    "Dessert",
  ]),
  difficulty: z.enum(["Einfach", "Mittel", "Anspruchsvoll"]),
  duration: z.number().int().positive("Muss positiv sein"),
  servings: z.number().int().positive("Muss positiv sein"),
  calories: z.number().int().min(0),
  tags: z.string(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Name erforderlich"),
        amount: z.number().min(0, "Muss ≥ 0 sein"),
        unit: z.string().min(1, "Einheit erforderlich"),
      }),
    )
    .min(1, "Min. 1 Zutat"),
  instructions: z
    .array(z.object({ value: z.string().min(5, "Min. 5 Zeichen") }))
    .min(1, "Min. 1 Schritt"),
  protein: z.number().int().min(0),
  carbs: z.number().int().min(0),
  fat: z.number().int().min(0),
});

export type RecipeFormInput = z.infer<typeof recipeFormSchema>;

export type RecipePayload = Omit<Recipe, "id" | "author" | "authorId">;
