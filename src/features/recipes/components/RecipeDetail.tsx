"use client";

import { useState } from "react";
import { Recipe } from "../types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatAmount } from "../utils/formatAmount";
import HeroCard from "./RecipeDetail/HeroCard";
import MacroCard from "./RecipeDetail/MacroCard";
import ServingsStepper from "./RecipeDetail/ServingsStepper";
import StatsCard from "./RecipeDetail/StatsCard";
import { RecipeOwnerActions } from "./RecipeOwnerActions";

interface RecipeDetailProps {
  recipe: Recipe;
  currentUserId?: string;
}

export function RecipeDetail({ recipe, currentUserId }: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings);

  const scale = servings / recipe.servings;
  const scaledCalories = Math.round(recipe.calories * scale);
  const isOwner = !!currentUserId && currentUserId === recipe.authorId;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Zurück zur Rezeptsammlung
      </Link>

      {/* Hero Card */}
      <HeroCard recipe={recipe} />
      {isOwner && <RecipeOwnerActions recipeId={recipe.id} />}

      {/* Main layout: info sidebar + content */}
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Left: info panel */}
        <div className="space-y-4 lg:sticky lg:top-20">
          {/* Stats */}
          <StatsCard
            difficulty={recipe.difficulty}
            duration={recipe.duration}
            scaledCalories={scaledCalories}
          />

          {/* Servings stepper */}
          <ServingsStepper servings={servings} onChangeServings={setServings} />

          {/* Macros */}
          <MacroCard recipe={recipe} scale={scale} />
        </div>

        {/* Right: ingredients + instructions */}
        <div className="space-y-6">
          {/* Ingredients */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold mb-4">
              Zutaten
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                für {servings} {servings === 1 ? "Portion" : "Portionen"}
              </span>
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <span className="text-sm">{ing.name}</span>
                  <span className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
                    {formatAmount(ing.amount * scale)} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold mb-5">Zubereitung</h2>
            <ol className="space-y-5">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1 pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
