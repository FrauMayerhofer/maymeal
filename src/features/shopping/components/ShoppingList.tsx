"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Check,
  Cloud,
  CloudOff,
  Loader2,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useShoppingList, SyncStatus } from "../hooks/useShoppingList";
import { formatAmount } from "@/features/recipes/utils/formatAmount";

export function ShoppingList() {
  const {
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
  } = useShoppingList();

  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputUnit, setInputUnit] = useState("");

  const unchecked = items.filter((i) => !i.checked);
  const checked = items.filter((i) => i.checked);

  const handleAdd = () => {
    const name = inputName.trim();
    if (!name) return;
    const amount = parseFloat(inputAmount.replace(",", "."));
    addItem(name, isNaN(amount) ? null : amount, inputUnit.trim() || null);
    setInputName("");
    setInputAmount("");
    setInputUnit("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={importPlan}
          disabled={isImporting}
          className="gap-2"
        >
          {isImporting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CalendarCheck className="size-4" />
          )}
          Aus Wochenplan laden
        </Button>

        {checked.length > 0 && (
          <Button
            variant="outline"
            onClick={clearChecked}
            className="gap-2 text-muted-foreground"
          >
            <Trash2 className="size-4" />
            Erledigte löschen ({checked.length})
          </Button>
        )}

        <div className="ml-auto">
          <SyncIndicator status={syncStatus} onSave={flush} />
        </div>
      </div>

      {/* Add item form */}
      <Card>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Zutat
            </label>
            <Input
              placeholder="z. B. Tomaten"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-1.5 w-24">
              <label className="text-xs font-medium text-muted-foreground">
                Menge
              </label>
              <Input
                placeholder="2"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <div className="flex flex-col gap-1.5 w-24">
              <label className="text-xs font-medium text-muted-foreground">
                Einheit
              </label>
              <Input
                placeholder="kg"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={!inputName.trim()}
            className="gap-2 shrink-0"
          >
            <Plus className="size-4" />
            Hinzufügen
          </Button>
        </CardContent>
      </Card>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground">
          <ShoppingCart className="size-10 opacity-30" />
          <p className="text-sm">
            Deine Einkaufsliste ist leer.
            <br />
            Füge Zutaten hinzu oder lade den Wochenplan.
          </p>
        </div>
      )}

      {/* Unchecked items */}
      {unchecked.length > 0 && (
        <div className="flex flex-col gap-1">
          {unchecked.map((item) => (
            <ShoppingItemRow
              key={item.id}
              name={item.name}
              amount={item.amount}
              unit={item.unit}
              checked={false}
              onToggle={() => toggleItem(item.id, true)}
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </div>
      )}

      {/* Checked items */}
      {checked.length > 0 && (
        <>
          {unchecked.length > 0 && <Separator />}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Erledigt
            </p>
            {checked.map((item) => (
              <ShoppingItemRow
                key={item.id}
                name={item.name}
                amount={item.amount}
                unit={item.unit}
                checked={true}
                onToggle={() => toggleItem(item.id, false)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SyncIndicator({
  status,
  onSave,
}: {
  status: SyncStatus;
  onSave: () => void;
}) {
  if (status === "synced") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Cloud className="size-3.5" />
        Gespeichert
      </span>
    );
  }

  if (status === "syncing") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3.5 animate-spin" />
        Wird gespeichert…
      </span>
    );
  }

  return (
    <button
      onClick={onSave}
      className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400"
    >
      <CloudOff className="size-3.5" />
      Nicht gespeichert — jetzt speichern
    </button>
  );
}

function ShoppingItemRow({
  name,
  amount,
  unit,
  checked,
  onToggle,
  onRemove,
}: {
  name: string;
  amount: number | null;
  unit: string | null;
  checked: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60">
      <button
        onClick={onToggle}
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/40 hover:border-primary/60",
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </button>
      <span
        className={cn(
          "flex-1 text-sm",
          checked && "line-through text-muted-foreground",
        )}
      >
        {name}
      </span>
      {(amount != null || unit) && (
        <span className="text-xs text-muted-foreground shrink-0">
          {amount != null ? formatAmount(amount) : ""}
          {unit ? ` ${unit}` : ""}
        </span>
      )}
      <button
        onClick={onRemove}
        className="hidden rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:flex group-hover:opacity-100"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
