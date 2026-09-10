"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";
import { SmoothScroll } from "./motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <SmoothScroll />
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
