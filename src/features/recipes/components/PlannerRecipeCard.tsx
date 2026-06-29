"use client";

import { Clock, Users, Flame } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "../types";
import { RecipeImage } from "./RecipeImage";

const difficultyColor = {
  Einfach: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Mittel: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Anspruchsvoll: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface PlannerRecipeCardProps {
  recipe: Recipe;
  onAdd: (recipe: Recipe) => void;
}

export function PlannerRecipeCard({ recipe, onAdd }: PlannerRecipeCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <RecipeImage imageUrl={recipe.imageUrl} alt={recipe.title} className="size-12 rounded-lg shrink-0" iconSize="sm" />
          <div>
            <CardTitle className="text-sm leading-tight">{recipe.title}</CardTitle>
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground leading-relaxed">{recipe.description}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {recipe.duration} Min.
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {recipe.servings} Pers.
          </span>
          <span className="flex items-center gap-1">
            <Flame className="size-3" />
            {recipe.calories} kcal
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={() => onAdd(recipe)}>
          Zum Wochenplan hinzufügen
        </Button>
      </CardFooter>
    </Card>
  );
}
