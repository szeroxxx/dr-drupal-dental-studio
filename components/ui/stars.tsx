import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value, className, size = "size-4" }: { value: number; className?: string; size?: string }) {
  const filled = Math.round(value);
  return (
    <span
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
      className={cn("inline-flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={0}
          className={cn(size, i < filled ? "fill-star" : "fill-line-strong")}
        />
      ))}
    </span>
  );
}
