"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { SignUpInput } from "../schemas/sign-up";

export default async function signUp({ email, password }: SignUpInput) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;
  return data;
}
