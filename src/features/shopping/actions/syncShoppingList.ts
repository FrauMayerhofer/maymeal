"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { ShoppingItem } from "./getShoppingList";

export async function syncShoppingList(
  current: ShoppingItem[],
  previous: ShoppingItem[],
): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Nicht angemeldet");

  const prevMap = new Map(previous.map((i) => [i.id, i]));
  const currMap = new Map(current.map((i) => [i.id, i]));

  const toInsert = current.filter((i) => !prevMap.has(i.id));
  const toUpdate = current.filter((i) => {
    const prev = prevMap.get(i.id);
    return prev && prev.checked !== i.checked;
  });
  const toDelete = previous.filter((i) => !currMap.has(i.id));

  if (toInsert.length === 0 && toUpdate.length === 0 && toDelete.length === 0)
    return;

  const results = await Promise.all([
    toInsert.length > 0
      ? supabase.from("shopping_list_items").insert(
          toInsert.map((i) => ({
            id: i.id,
            user_id: user.id,
            name: i.name,
            amount: i.amount,
            unit: i.unit,
            checked: i.checked,
          })),
        )
      : Promise.resolve({ error: null }),
    ...toUpdate.map((item) =>
      supabase
        .from("shopping_list_items")
        .update({ checked: item.checked })
        .eq("id", item.id)
        .eq("user_id", user.id),
    ),
    toDelete.length > 0
      ? supabase
          .from("shopping_list_items")
          .delete()
          .in(
            "id",
            toDelete.map((i) => i.id),
          )
          .eq("user_id", user.id)
      : Promise.resolve({ error: null }),
  ]);

  const errors = results
    .filter((r) => r.error)
    .map((r) => r.error!.message);
  if (errors.length > 0) throw new Error(errors.join("; "));
}
