import { WeeklyPlanner } from "@/features/planner/components/WeeklyPlanner";
import { WeeklyPlannerSkeleton } from "@/features/planner/components/WeeklyPlannerSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Wochenplan</h2>
      </div>
      <Suspense fallback={<WeeklyPlannerSkeleton />}>
        <WeeklyPlanner />
      </Suspense>
    </div>
  );
}
