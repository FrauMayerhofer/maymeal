"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function deleteRecipe(id: string): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const { error } = await supabase.from("recipes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
