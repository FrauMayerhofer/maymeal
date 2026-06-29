"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function logout() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
