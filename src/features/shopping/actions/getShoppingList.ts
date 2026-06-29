"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export type ShoppingItem = {
  id: string;
  name: string;
  amount: number | null;
  unit: string | null;
  checked: boolean;
  created_at: string;
};

export async function getShoppingList(): Promise<ShoppingItem[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const { data, error } = await supabase
    .from("shopping_list_items")
    .select("id, name, amount, unit, checked, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
