"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getIngredientsFromMealPlan } from "../actions/getIngredientsFromMealPlan";
import { ShoppingItem, getShoppingList } from "../actions/getShoppingList";
import { syncShoppingList } from "../actions/syncShoppingList";

const SYNC_DELAY_MS = 90_000;

export type SyncStatus = "synced" | "pending" | "syncing";

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("synced");

  // Refs so timer callbacks always see the latest values without stale closures
  const itemsRef = useRef<ShoppingItem[]>([]);
  const lastSyncedRef = useRef<ShoppingItem[]>([]);
  const hasPendingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyItems = useCallback(
    (updater: (prev: ShoppingItem[]) => ShoppingItem[]) => {
      setItems((prev) => {
        const next = updater(prev);
        itemsRef.current = next;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    getShoppingList()
      .then((data) => {
        itemsRef.current = data;
        lastSyncedRef.current = structuredClone(data);
        setItems(data);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        toast.error(e.message);
        setIsLoading(false);
      });
  }, []);

  const flush = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!hasPendingRef.current) return;
    setSyncStatus("syncing");
    try {
      await syncShoppingList(itemsRef.current, lastSyncedRef.current);
      lastSyncedRef.current = structuredClone(itemsRef.current);
      hasPendingRef.current = false;
      setSyncStatus("synced");
    } catch (e) {
      toast.error("Synchronisierung fehlgeschlagen.");
      setSyncStatus("pending");
    }
  }, []);

  const scheduleSync = useCallback(() => {
    hasPendingRef.current = true;
    setSyncStatus("pending");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flush, SYNC_DELAY_MS);
  }, [flush]);

  // Flush on tab hide or page close
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Also flush when the component unmounts (e.g. navigation)
      flush();
    };
  }, [flush]);

  const addItem = useCallback(
    (name: string, amount?: number | null, unit?: string | null) => {
      const newItem: ShoppingItem = {
        id: crypto.randomUUID(),
        name,
        amount: amount ?? null,
        unit: unit ?? null,
        checked: false,
        created_at: new Date().toISOString(),
      };
      applyItems((prev) => [...prev, newItem]);
      scheduleSync();
    },
    [applyItems, scheduleSync],
  );

  const toggleItem = useCallback(
    (id: string, checked: boolean) => {
      applyItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item)),
      );
      scheduleSync();
    },
    [applyItems, scheduleSync],
  );

  const removeItem = useCallback(
    (id: string) => {
      applyItems((prev) => prev.filter((item) => item.id !== id));
      scheduleSync();
    },
    [applyItems, scheduleSync],
  );

  const clearChecked = useCallback(() => {
    applyItems((prev) => prev.filter((item) => !item.checked));
    scheduleSync();
  }, [applyItems, scheduleSync]);

  const importPlan = useCallback(async () => {
    setIsImporting(true);
    try {
      const ingredients = await getIngredientsFromMealPlan();
      if (ingredients.length === 0) {
        toast.info("Keine Zutaten im Wochenplan gefunden.");
        return;
      }
      const newItems: ShoppingItem[] = ingredients.map((ing) => ({
        id: crypto.randomUUID(),
        name: ing.name,
        amount: ing.amount,
        unit: ing.unit,
        checked: false,
        created_at: new Date().toISOString(),
      }));
      applyItems((prev) => [...prev, ...newItems]);
      scheduleSync();
      toast.success(`${newItems.length} Zutaten aus dem Wochenplan importiert.`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsImporting(false);
    }
  }, [applyItems, scheduleSync]);

  return {
    items,
    isLoading,
    isImporting,
    syncStatus,
    addItem,
    toggleItem,
    removeItem,
    clearChecked,
    importPlan,
    flush,
  };
}
