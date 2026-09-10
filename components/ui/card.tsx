import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-card border border-line bg-white", className)} {...props} />;
}

/** Rounded square that holds an icon — used on treatment, trust and contact cards. */
export function IconChip({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
