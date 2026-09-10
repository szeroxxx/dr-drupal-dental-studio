"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let instance: Lenis | null = null;

/** Lets overlays (e.g. the mobile menu) pause smooth scrolling. */
export function getLenis() {
  return instance;
}

/** Desktop smooth scrolling. Touch devices keep native scrolling; reduced-motion users opt out entirely. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, duration: 1.05, anchors: true, stopInertiaOnNavigate: true });
    instance = lenis;

    return () => {
      lenis.destroy();
      instance = null;
    };
  }, []);

  return null;
}
