import { Recipe } from "../types";

export type RecipeRow = {
  id: string;
  title: string;
  description: string;
  category: Recipe["category"];
  difficulty: Recipe["difficulty"];
  duration: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image_url: string | null;
  author_id: string;
  author_name: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    position: number;
  }[];
  instructions: { step_number: number; content: string }[];
  recipe_tags: { tag: string }[];
};

export function mapRecipe(row: RecipeRow): Recipe {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    difficulty: row.difficulty,
    duration: row.duration,
    servings: row.servings,
    calories: row.calories,
    imageUrl: row.image_url,
    tags: row.recipe_tags.map((t) => t.tag),
    ingredients: [...row.ingredients]
      .sort((a, b) => a.position - b.position)
      .map(({ name, amount, unit }) => ({ name, amount, unit })),
    instructions: [...row.instructions]
      .sort((a, b) => a.step_number - b.step_number)
      .map((i) => i.content),
    macros: { protein: row.protein, carbs: row.carbs, fat: row.fat },
    author: row.author_name ?? "Unbekannt",
    authorId: row.author_id,
  };
}

export const RECIPE_SELECT = `
  *,
  ingredients ( name, amount, unit, position ),
  instructions ( step_number, content ),
  recipe_tags ( tag )
` as const;
