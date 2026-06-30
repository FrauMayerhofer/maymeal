export type Category =
  | "Frühstück"
  | "Mittagessen"
  | "Abendessen"
  | "Snack"
  | "Dessert";
//export type MealSlot = "Frühstück" | "Mittagessen" | "Abendessen";

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  section?: string | null;
}

export interface Macros {
  protein: number; // g per serving
  carbs: number; // g per serving
  fat: number; // g per serving
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: number;
  servings: number;
  difficulty: "Einfach" | "Mittel" | "Anspruchsvoll";
  tags: string[];
  imageUrl: string | null;
  calories: number;
  ingredients: Ingredient[];
  instructions: string[];
  macros: Macros;
  author: string;
  authorId: string;
}
