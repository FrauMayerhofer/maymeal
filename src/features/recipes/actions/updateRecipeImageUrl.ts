"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function updateRecipeImageUrl(id: string, imageUrl: string): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("recipes")
    .update({ image_url: imageUrl })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
