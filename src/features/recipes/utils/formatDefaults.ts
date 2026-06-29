import { RecipeFormInput } from "../schemas/recipe";
import { Recipe } from "../types";

export function toFormDefaults(recipe: Recipe): RecipeFormInput {
  return {
    imageUrl: recipe.imageUrl,
    title: recipe.title,
    description: recipe.description,
    category: recipe.category,
    difficulty: recipe.difficulty,
    duration: recipe.duration,
    servings: recipe.servings,
    calories: recipe.calories,
    tags: recipe.tags.join(", "),
    ingredients: recipe.ingredients,
    instructions: recipe.instructions.map((v) => ({ value: v })),
    protein: recipe.macros.protein,
    carbs: recipe.macros.carbs,
    fat: recipe.macros.fat,
  };
}
