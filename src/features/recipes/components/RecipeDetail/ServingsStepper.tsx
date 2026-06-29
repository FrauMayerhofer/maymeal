import { Button } from "@/components/ui/button";
import { Minus, Plus, Users } from "lucide-react";

type Props = {
  servings: number;
  onChangeServings: (newServing: number) => void;
};
export default function ServingsStepper({ servings, onChangeServings }: Props) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <div>
            <p className="font-semibold text-sm">Portionen</p>
            <p className="text-xs text-muted-foreground">
              Mengen passen sich an
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onChangeServings(Math.max(1, servings - 1))}
            disabled={servings <= 1}
          >
            <Minus className="size-3.5" />
          </Button>
          <span className="w-7 text-center text-lg font-bold tabular-nums">
            {servings}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onChangeServings(Math.min(20, servings + 1))}
            disabled={servings >= 20}
          >
            <Plus className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
