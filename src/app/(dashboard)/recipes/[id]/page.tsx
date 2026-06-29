import { getRecipe } from "@/features/recipes/actions/getRecipe";
import { RecipeDetail } from "@/features/recipes/components/RecipeDetail";
import getUser from "@/features/auth/actions/getUser";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const [recipe, user] = await Promise.all([
    getRecipe(id),
    getUser().catch(() => null),
  ]);

  console.log(user);

  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} currentUserId={user?.id} />;
}
