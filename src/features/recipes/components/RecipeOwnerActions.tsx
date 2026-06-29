"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";

interface RecipeOwnerActionsProps {
  recipeId: string;
}

export function RecipeOwnerActions({ recipeId }: RecipeOwnerActionsProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeleteRecipe();

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/recipes/${recipeId}/edit`}>
            <Pencil className="size-3.5 mr-1.5" />
            Bearbeiten
          </Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash2 className="size-3.5 mr-1.5" />
          Löschen
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rezept löschen?</DialogTitle>
            <DialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden. Das Rezept
              wird dauerhaft entfernt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => mutate(recipeId)}
            >
              {isPending ? "Wird gelöscht…" : "Endgültig löschen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
