"use server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { SignInInput } from "../schemas/sign-in";

export default async function signIn({ email, password }: SignInInput) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}
