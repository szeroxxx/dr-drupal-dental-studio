import type { ElementType, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Script accent word, echoing the reference design's handwritten flourish. Use once per heading. */
export function Script({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-script pr-[0.05em] text-[1.22em] font-normal leading-[0.7] tracking-normal text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "type-eyebrow inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-white/80 px-3.5 py-1.5 text-brand-800 backdrop-blur-sm",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-brand-500" />
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  action?: ReactNode;
  /** Above-the-fold headers skip the scroll reveal so they paint immediately. */
  animate?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  action,
  animate = true,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const Wrapper: ElementType = animate ? Reveal : "div";

  return (
    <Wrapper
      className={cn(
        "flex flex-col gap-6",
        centered ? "mx-auto max-w-2xl items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn(centered ? "flex flex-col items-center" : "max-w-2xl")}>
        {eyebrow && (
          <div className="mb-5">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        )}
        <Heading id={id} className={cn(Heading === "h1" ? "type-h1" : "type-h2", "text-balance text-ink")}>
          {title}
        </Heading>
        {description && (
          <p className={cn("type-lead mt-4 text-pretty text-muted", centered && "mx-auto max-w-xl")}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Wrapper>
  );
}
