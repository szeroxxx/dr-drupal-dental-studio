"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { easeSoft } from "@/components/motion/reveal";
import { Stars } from "@/components/ui/stars";
import type { Review } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/** Verbatim patient reviews. Renders only when reviews are added in lib/clinic-data.ts. */
export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  const go = (step: number) => setIndex((i) => (i + step + reviews.length) % reviews.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Patient reviews"
      className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 shadow-soft md:p-12"
    >
      <Quote aria-hidden className="size-10 text-brand-500" />
      <div aria-live="polite" className="mt-8 min-h-[13rem]">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: easeSoft }}
          >
            <blockquote className="font-serif text-[1.6rem] leading-snug text-ink md:text-[1.9rem]">
              “{review.text}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-brand-100 font-semibold text-brand-800">
                {review.author.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold text-ink">{review.author}</span>
                <Stars value={review.rating} size="size-3.5" />
              </span>
              <span className="ml-auto text-xs text-muted">via {review.source}</span>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      {reviews.length > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {reviews.map((r, i) => (
              <button
                key={`${r.author}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show review ${i + 1} of ${reviews.length}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === index ? "w-6 bg-brand-600" : "w-1.5 bg-line-strong hover:bg-brand-300",
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-brand-600 hover:text-brand-800"
            >
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-brand-600 hover:text-brand-800"
            >
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
