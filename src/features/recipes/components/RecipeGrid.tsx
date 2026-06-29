"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./RecipeCard";
import type { Category, Recipe } from "../types";
import { CATEGORIES } from "../constants";
import { useGetRecipes } from "../hooks/getRecipes";

interface RecipeGridProps {
  onAddToPlanner?: (recipe: Recipe) => void;
}

export function RecipeGrid({ onAddToPlanner }: RecipeGridProps) {
  const RECIPES = useGetRecipes();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "Alle">(
    "Alle",
  );

  const filtered = RECIPES.filter((r) => {
    const matchesCategory =
      activeCategory === "Alle" || r.category === activeCategory;

    const matchesSearch =
      search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rezept suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {/* Filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-muted-foreground">
          <span className="text-4xl">🔍</span>
          <p className="text-sm">Keine Rezepte gefunden</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAdd={onAddToPlanner}
            />
          ))}
        </div>
      )}
    </div>
  );
}
