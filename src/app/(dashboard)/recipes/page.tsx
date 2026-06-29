import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RecipeGrid } from "@/features/recipes/components/RecipeGrid";
import { RecipeGridSkeleton } from "@/features/recipes/components/RecipeGridSkeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function RecipePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Rezeptsammlung</h2>
          <p className="text-sm text-muted-foreground">
            Entdecke Rezepte und füge sie zu deinem Wochenplan hinzu
          </p>
        </div>
        <Button asChild>
          <Link href="/recipes/new">
            <Plus className="size-4 mr-1.5" />
            Neues Rezept
          </Link>
        </Button>
      </div>
      <Separator className="mb-5" />
      <Suspense fallback={<RecipeGridSkeleton />}>
        <RecipeGrid />
      </Suspense>
    </div>
  );
}
