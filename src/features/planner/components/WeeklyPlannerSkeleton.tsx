import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const DAYS = 7;
const SLOTS = 3;

export function WeeklyPlannerSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Week nav */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-52" />
        <div className="flex items-center gap-1">
          <Skeleton className="size-9 rounded-md" />
          <Skeleton className="size-9 rounded-md" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>
            <CardContent className="flex flex-col gap-1.5 pt-4">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly grid */}
      <ScrollArea className="w-full">
        <div className="md:min-w-175">
          <div className="grid grid-cols-[80px_repeat(7,calc(100vw-8rem))] md:grid-cols-[80px_repeat(7,1fr)] gap-5">
            {/* Header row */}
            <div />
            {Array.from({ length: DAYS }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-6" />
              </div>
            ))}

            {/* Meal slot rows */}
            {Array.from({ length: SLOTS }).map((_, slotIdx) => (
              <Fragment key={slotIdx}>
                <div className="flex items-start pt-1">
                  <Skeleton className="h-3 w-14" />
                </div>
                {Array.from({ length: DAYS }).map((_, dayIdx) => (
                  <Skeleton key={dayIdx} className="h-16 w-full rounded-lg" />
                ))}
                {slotIdx < SLOTS - 1 && (
                  <div className="col-span-8 my-1">
                    <Separator />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
