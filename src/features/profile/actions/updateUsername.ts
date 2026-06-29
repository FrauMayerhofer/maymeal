"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function updateUsername(username: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.updateUser({
    data: { username },
  });

  if (!data.user || error) return Error("Keinen User gefunden");

  const userId = data.user.id;
  const { error: updateError } = await supabase
    .from("recipes")
    .update({
      author_name: username,
    })
    .eq("author_id", userId);

  if (updateError) throw updateError;
  return data.user;
}
