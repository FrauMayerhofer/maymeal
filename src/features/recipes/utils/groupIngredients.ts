import { Ingredient } from "../types";

export interface IngredientGroup {
  section: string;
  items: Ingredient[];
}

/**
 * Groups ingredients by consecutive `section` value, preserving order.
 * Ingredients without a section are grouped under section: "".
 */
export function groupIngredients(ingredients: Ingredient[]): IngredientGroup[] {
  const groups: IngredientGroup[] = [];
  for (const ing of ingredients) {
    const section = ing.section?.trim() ?? "";
    const last = groups[groups.length - 1];
    if (last && last.section === section) {
      last.items.push(ing);
    } else {
      groups.push({ section, items: [ing] });
    }
  }
  return groups;
}
