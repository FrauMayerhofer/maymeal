import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeImageProps {
  imageUrl: string | null;
  alt: string;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

export function RecipeImage({
  imageUrl,
  alt,
  className,
  iconSize = "md",
}: RecipeImageProps) {
  if (imageUrl) {
    return (
      <div className={cn("overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted/50",
        className,
      )}
    >
      <UtensilsCrossed
        className={cn(
          "text-muted-foreground",
          iconSize === "sm" && "size-4",
          iconSize === "md" && "size-8",
          iconSize === "lg" && "size-12",
        )}
      />
    </div>
  );
}
