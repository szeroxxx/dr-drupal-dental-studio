"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

/*
 * Scroll reveals. Reduced-motion users are handled globally by <MotionConfig reducedMotion="user">
 * (transforms are dropped, only a soft fade remains), which keeps server and client markup identical.
 */

export const easeSoft = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

export function Reveal({ children, className, delay = 0, y = 18, amount = 0.2 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: easeSoft, delay }}
    >
      {children}
    </m.div>
  );
}

const item: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeSoft } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
};

export function Stagger({ children, className, stagger = 0.07, delay = 0, amount = 0.15, as = "div" }: StaggerProps) {
  const props = {
    className,
    variants: { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } } as Variants,
    initial: "hidden",
    whileInView: "show",
    viewport: { once: true, amount },
  };
  if (as === "ul") return <m.ul {...props}>{children}</m.ul>;
  if (as === "ol") return <m.ol {...props}>{children}</m.ol>;
  return <m.div {...props}>{children}</m.div>;
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  if (as === "li") {
    return (
      <m.li className={className} variants={item}>
        {children}
      </m.li>
    );
  }
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}
