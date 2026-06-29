import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NewRecipeForm } from "@/features/recipes/components/NewRecipeForm";

export default function NewRecipePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Zurück zur Rezeptsammlung
      </Link>
      <h1 className="text-2xl font-bold mb-6">Neues Rezept erstellen</h1>
      <NewRecipeForm />
    </div>
  );
}
