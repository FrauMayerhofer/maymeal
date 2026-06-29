import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getRecipe } from "@/features/recipes/actions/getRecipe";
import getUser from "@/features/auth/actions/getUser";
import { EditRecipeForm } from "@/features/recipes/components/EditRecipeForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const [recipe, user] = await Promise.all([
    getRecipe(id),
    getUser().catch(() => null),
  ]);

  if (!recipe) notFound();
  if (!user || user.id !== recipe.authorId) redirect(`/recipes/${id}`);

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href={`/recipes/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Zurück zum Rezept
      </Link>
      <h1 className="text-2xl font-bold mb-6">
        {recipe.title} bearbeiten
      </h1>
      <EditRecipeForm recipe={recipe} />
    </div>
  );
}
