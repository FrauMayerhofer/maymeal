"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function resetPassword(email: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw error;
}
