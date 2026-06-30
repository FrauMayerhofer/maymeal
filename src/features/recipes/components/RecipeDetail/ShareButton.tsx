"use client";
import React, { useState } from "react";
import { Recipe } from "../../types";
import { formatAmount } from "../../utils/formatAmount";
import { groupIngredients } from "../../utils/groupIngredients";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";

type Props = {
  recipe: Recipe;
  scale: number;
  servings: number;
  scaledCalories: number;
};
export default function ShareButton({
  recipe,
  scale,
  scaledCalories,
  servings,
}: Props) {
  const [copied, setCopied] = useState(false);

  function buildShareText() {
    const url = `${process.env.NEXT_PUBLIC_URL}/recipes/${recipe.id}`;
    const ingredientLines = groupIngredients(recipe.ingredients)
      .map((group) => {
        const lines = group.items
          .map(
            (ing) =>
              `• ${formatAmount(ing.amount * scale)} ${ing.unit} ${ing.name}`,
          )
          .join("\n");
        return group.section ? `${group.section}:\n${lines}` : lines;
      })
      .join("\n\n");
    const instructionLines = recipe.instructions
      .map((step, i) => `${i + 1}. ${step}`)
      .join("\n");

    return [
      `🍽️ ${recipe.title}`,
      ``,
      recipe.description,
      ``,
      `📋 Infos`,
      `• Kategorie: ${recipe.category}`,
      `• Schwierigkeit: ${recipe.difficulty}`,
      `• Dauer: ${recipe.duration} Min.`,
      `• Portionen: ${servings}`,
      `• Kalorien: ${scaledCalories} kcal`,
      ``,
      `🥗 Makros (pro Portion)`,
      `• Protein: ${Math.round(recipe.macros.protein * scale)} g`,
      `• Kohlenhydrate: ${Math.round(recipe.macros.carbs * scale)} g`,
      `• Fett: ${Math.round(recipe.macros.fat * scale)} g`,
      ``,
      `🛒 Zutaten (für ${servings} ${servings === 1 ? "Portion" : "Portionen"})`,
      ingredientLines,
      ``,
      `👨‍🍳 Zubereitung`,
      instructionLines,
      ``,
      `🔗 ${url}`,
    ].join("\n");
  }

  async function handleShare() {
    const text = buildShareText();
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, text });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") throw err;
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast.success("Rezept kopiert!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1.5"
    >
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      Teilen
    </Button>
  );
}
