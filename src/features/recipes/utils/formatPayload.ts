import { RecipeFormInput, RecipePayload } from "../schemas/recipe";

export function toPayload(input: RecipeFormInput): RecipePayload {
  return {
    imageUrl: input.imageUrl,
    title: input.title,
    description: input.description,
    category: input.category,
    difficulty: input.difficulty,
    duration: input.duration,
    servings: input.servings,
    calories: input.calories,
    tags: input.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    ingredients: input.ingredients.flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        section: group.section?.trim() || null,
      })),
    ),
    instructions: input.instructions.map((i) => i.value),
    macros: { protein: input.protein, carbs: input.carbs, fat: input.fat },
  };
}
