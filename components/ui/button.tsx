import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_10px_24px_-12px_rgb(11_111_117/0.7)] hover:bg-brand-800",
  secondary: "border border-line-strong bg-white text-ink hover:border-brand-600 hover:text-brand-800",
  ghost: "text-brand-800 hover:bg-brand-50",
  light: "bg-white text-brand-800 hover:bg-brand-50",
  outlineLight: "border border-white/35 text-white hover:border-white/60 hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.9375rem]",
  lg: "h-[3.25rem] px-6 text-[0.9375rem]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "group/btn inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[0.7rem] font-semibold tracking-[-0.005em]",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-soft active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="transition-transform duration-300 ease-soft group-hover/btn:translate-x-0.5"
    />
  );
}

type Common = { variant?: Variant; size?: Size; withArrow?: boolean };

export function Button({
  variant,
  size,
  withArrow,
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & Common) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

/** Internal paths use next/link; tel:, mailto: and external URLs render a plain anchor. */
export function ButtonLink({
  href,
  variant,
  size,
  withArrow,
  className,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> & Common & { href: string }) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {content}
    </a>
  );
}
