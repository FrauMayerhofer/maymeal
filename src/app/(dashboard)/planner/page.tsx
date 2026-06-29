import { WeeklyPlanner } from "@/features/recipes/components/WeeklyPlanner";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Wochenplan</h2>
      </div>
      <Suspense>
        <WeeklyPlanner />
      </Suspense>
    </div>
  );
}
