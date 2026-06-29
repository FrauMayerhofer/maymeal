import { SupabaseClient } from "@supabase/supabase-js";

export async function uploadRecipeImage(
  supabase: SupabaseClient,
  recipeId: string,
  file: File,
): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${recipeId}/image.${ext}`;

  const { error } = await supabase.storage
    .from("recipe-images")
    .upload(path, file, { upsert: true });

  console.log(error);
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("recipe-images").getPublicUrl(path);

  return data.publicUrl;
}
