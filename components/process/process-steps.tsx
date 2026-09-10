"use client";

import { useRef } from "react";
import { m, useScroll } from "motion/react";
import { easeSoft } from "@/components/motion/reveal";

type Step = { title: string; text: string };

/** Numbered steps with a progress line that fills as the list scrolls through the viewport. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-10 left-5 top-10 w-px bg-line" />
      <m.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-10 left-5 top-10 w-px origin-top bg-brand-500"
      />
      {steps.map((step, i) => (
        <m.li
          key={step.title}
          className="group relative grid grid-cols-[2.5rem_1fr] gap-5 sm:gap-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          <span className="relative z-10 mt-6 grid size-10 place-items-center rounded-full border border-brand-200 bg-white text-sm font-semibold tabular-nums text-brand-800 transition-colors duration-500 group-hover:border-brand-600 group-hover:bg-brand-700 group-hover:text-white sm:mt-7">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="border-b border-line py-7 group-last:border-b-0 sm:grid sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-baseline sm:gap-8 sm:py-8">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink sm:text-[1.375rem]">{step.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted sm:mt-0">{step.text}</p>
          </div>
        </m.li>
      ))}
    </ol>
  );
}
