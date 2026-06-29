"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;

  return data.user;
}
