import { ChefHat, Clock, Flame } from "lucide-react";
import { Recipe } from "../../types";

type Props = {
  difficulty: Recipe["difficulty"];
  duration: number;
  scaledCalories: number;
};
export default function StatsCard({
  difficulty,
  duration,
  scaledCalories,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Info
      </p>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-muted/50 py-3 px-2">
          <Clock className="size-4 mx-auto mb-1 text-primary" />
          <p className="text-xs text-muted-foreground">Dauer</p>
          <p className="font-bold text-sm">
            {duration}
            <span className="font-normal text-xs"> Min</span>
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 py-3 px-2">
          <Flame className="size-4 mx-auto mb-1 text-orange-500" />
          <p className="text-xs text-muted-foreground">Kalorien</p>
          <p className="font-bold text-sm">
            {scaledCalories}
            <span className="font-normal text-xs"> kcal</span>
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 py-3 px-2">
          <ChefHat className="size-4 mx-auto mb-1 text-blue-500" />
          <p className="text-xs text-muted-foreground">Level</p>
          <p className="font-bold text-xs leading-tight mt-0.5">{difficulty}</p>
        </div>
      </div>
    </div>
  );
}
