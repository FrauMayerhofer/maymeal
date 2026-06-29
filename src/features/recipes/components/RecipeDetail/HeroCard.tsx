import { Recipe } from "../../types";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";
import { RecipeImage } from "../RecipeImage";

const difficultyColor: Record<Recipe["difficulty"], string> = {
  Einfach:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Mittel:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Anspruchsvoll: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface Props {
  recipe: Recipe;
}

export default function HeroCard({ recipe }: Props) {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <RecipeImage
          imageUrl={recipe.imageUrl}
          alt={recipe.title}
          className="aspect-video sm:aspect-auto sm:w-52 sm:shrink-0"
          iconSize="lg"
        />
        <div className="flex-1 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary">{recipe.category}</Badge>
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor[recipe.difficulty]}`}
            >
              {recipe.difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
              <UserRound className="size-3" />
              {recipe.author}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {recipe.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
