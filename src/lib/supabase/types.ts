export type RecipeCategory =
  | "Frühstück"
  | "Mittagessen"
  | "Abendessen"
  | "Snack"
  | "Dessert";

export type RecipeDifficulty = "Einfach" | "Mittel" | "Anspruchsvoll";

export type MealSlotEnum = "Frühstück" | "Mittagessen" | "Abendessen";

type Rel = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string;
          title: string;
          description: string;
          category: RecipeCategory;
          difficulty: RecipeDifficulty;
          duration: number;
          servings: number;
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
          image_url: string | null;
          author_id: string;
          author_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          category: RecipeCategory;
          difficulty: RecipeDifficulty;
          duration: number;
          servings: number;
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
          image_url?: string | null;
          author_id: string;
          author_name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          category?: RecipeCategory;
          difficulty?: RecipeDifficulty;
          duration?: number;
          servings?: number;
          calories?: number;
          protein?: number;
          carbs?: number;
          fat?: number;
          image_url?: string | null;
          author_name?: string;
        };
        Relationships: Rel[];
      };
      ingredients: {
        Row: {
          id: string;
          recipe_id: string;
          position: number;
          name: string;
          amount: number;
          unit: string;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          position: number;
          name: string;
          amount: number;
          unit: string;
        };
        Update: {
          position?: number;
          name?: string;
          amount?: number;
          unit?: string;
        };
        Relationships: Rel[];
      };
      instructions: {
        Row: {
          id: string;
          recipe_id: string;
          step_number: number;
          content: string;
        };
        Insert: {
          id?: string;
          recipe_id: string;
          step_number: number;
          content: string;
        };
        Update: {
          step_number?: number;
          content?: string;
        };
        Relationships: Rel[];
      };
      recipe_tags: {
        Row: {
          recipe_id: string;
          tag: string;
        };
        Insert: {
          recipe_id: string;
          tag: string;
        };
        Update: Record<string, never>;
        Relationships: Rel[];
      };
      meal_plans: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          slot: MealSlotEnum;
          recipe_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          slot: MealSlotEnum;
          recipe_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: Rel[];
      };
      shopping_list_items: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          amount: number | null;
          unit: string | null;
          checked: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          amount?: number | null;
          unit?: string | null;
          checked?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          amount?: number | null;
          unit?: string | null;
          checked?: boolean;
        };
        Relationships: Rel[];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      recipe_category: RecipeCategory;
      recipe_difficulty: RecipeDifficulty;
      meal_slot: MealSlotEnum;
    };
  };
}
