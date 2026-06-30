import { RecipeFormInput } from "../schemas/recipe";
import { Recipe } from "../types";
import { groupIngredients } from "./groupIngredients";

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
    ingredients: groupIngredients(recipe.ingredients).map((group) => ({
      section: group.section,
      items: group.items.map(({ name, amount, unit }) => ({
        name,
        amount,
        unit,
      })),
    })),
    instructions: recipe.instructions.map((v) => ({ value: v })),
    protein: recipe.macros.protein,
    carbs: recipe.macros.carbs,
    fat: recipe.macros.fat,
  };
}
