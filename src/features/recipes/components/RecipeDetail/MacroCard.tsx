import React from "react";
import { Recipe } from "../../types";
import { Separator } from "@/components/ui/separator";

interface Props {
  recipe: Recipe;
  scale: number;
}

export default function MacroCard({ recipe, scale }: Props) {
  const scaledProtein = Math.round(recipe.macros.protein * scale);
  const scaledCarbs = Math.round(recipe.macros.carbs * scale);
  const scaledFat = Math.round(recipe.macros.fat * scale);

  const proteinKcal = scaledProtein * 4;
  const carbsKcal = scaledCarbs * 4;
  const fatKcal = scaledFat * 9;
  const totalMacroKcal = proteinKcal + carbsKcal + fatKcal;

  const proteinPct = Math.round((proteinKcal / totalMacroKcal) * 100);
  const carbsPct = Math.round((carbsKcal / totalMacroKcal) * 100);
  const fatPct = 100 - proteinPct - carbsPct;
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Nährwerte · pro Portion
      </p>

      {/* Stacked bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
        <div
          className="bg-sky-500 rounded-l-full transition-all duration-300"
          style={{ width: `${proteinPct}%` }}
        />
        <div
          className="bg-amber-400 transition-all duration-300"
          style={{ width: `${carbsPct}%` }}
        />
        <div
          className="bg-rose-500 rounded-r-full transition-all duration-300"
          style={{ width: `${fatPct}%` }}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
          {proteinPct}% P
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
          {carbsPct}% K
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
          {fatPct}% F
        </span>
      </div>

      <Separator />

      {/* Macro cards */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-sky-50 dark:bg-sky-900/20 py-2.5 px-1">
          <p className="text-lg font-bold text-sky-600 dark:text-sky-400 tabular-nums">
            {scaledProtein}
          </p>
          <p className="text-[10px] text-sky-600/70 dark:text-sky-400/70 font-medium">
            g Protein
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 py-2.5 px-1">
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            {scaledCarbs}
          </p>
          <p className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-medium">
            g Kohlenhydr.
          </p>
        </div>
        <div className="rounded-lg bg-rose-50 dark:bg-rose-900/20 py-2.5 px-1">
          <p className="text-lg font-bold text-rose-600 dark:text-rose-400 tabular-nums">
            {scaledFat}
          </p>
          <p className="text-[10px] text-rose-600/70 dark:text-rose-400/70 font-medium">
            g Fett
          </p>
        </div>
      </div>
    </div>
  );
}
