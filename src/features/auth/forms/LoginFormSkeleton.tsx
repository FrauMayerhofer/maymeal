import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function LoginFormSkeleton() {
  return (
    <Card className="w-full sm:max-w-sm">
      <CardHeader className="text-center items-center gap-2">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-52" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-18" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-2" />
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Separator />
        <Skeleton className="h-4 w-48 mx-auto" />
      </CardFooter>
    </Card>
  );
}
