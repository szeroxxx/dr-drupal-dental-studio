"use client";

import { useRef, type CSSProperties } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Clock } from "lucide-react";
import { ClinicImage } from "@/components/ui/clinic-image";
import { GoogleIcon } from "@/components/ui/icons";
import { Stars } from "@/components/ui/stars";
import { clinic, media, sessionText } from "@/lib/clinic-data";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Concentric rings echo the circular logo mark */}
      <div aria-hidden className="absolute -inset-[6%] rounded-full border border-brand-300/45" />
      <div aria-hidden className="absolute -inset-[13%] hidden rounded-full border border-brand-200/40 md:block" />

      <div className="hero-mask absolute inset-0 overflow-hidden rounded-full bg-brand-100 shadow-lift">
        <m.div style={{ y: reduceMotion ? 0 : y }} className="absolute -inset-[5%]">
          <ClinicImage
            src={media.hero}
            alt="A smiling adult patient reviewing dental care with a clinician"
            label="Patient consultation"
            objectPosition="62% 42%"
            sizes="(min-width: 1024px) 34rem, 90vw"
            preload
            className="size-full"
          />
        </m.div>
      </div>
      <p className="absolute -bottom-8 inset-x-0 text-center text-[10px] font-medium tracking-[0.06em] text-muted">
        Illustrative photography
      </p>

      <a
        href={clinic.links.googleProfile}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Rated ${clinic.ratings.google.value.toFixed(1)} out of 5 on Google — read reviews (opens in a new tab)`}
        className="hero-rise absolute -left-1 bottom-[7%] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 pr-5 shadow-lift backdrop-blur-md transition-transform duration-500 ease-soft hover:-translate-y-1 sm:-left-6"
        style={delay(420)}
      >
        <span className="grid size-10 place-items-center rounded-xl bg-white shadow-soft">
          <GoogleIcon className="size-5" />
        </span>
        <span className="leading-tight">
          <span className="flex items-center gap-2">
            <span className="text-lg font-semibold text-ink">{clinic.ratings.google.value.toFixed(1)}</span>
            <Stars value={clinic.ratings.google.value} size="size-3.5" />
          </span>
          <span className="block text-xs text-muted">
            {clinic.ratings.google.count ? `${clinic.ratings.google.count} reviews on Google` : "Rated on Google"}
          </span>
        </span>
      </a>

      <div
        className="hero-rise absolute -right-1 top-[8%] rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lift backdrop-blur-md sm:-right-5"
        style={delay(540)}
      >
        <p className="type-eyebrow flex items-center gap-2 text-[0.6875rem] text-brand-800">
          <Clock aria-hidden className="size-3.5" />
          Studio hours
        </p>
        <dl className="mt-2.5 space-y-1 text-[0.8125rem]">
          {clinic.hours.sessions.map((s) => (
            <div key={s.label} className="flex justify-between gap-5">
              <dt className="text-muted">{s.label}</dt>
              <dd className="font-semibold tabular-nums text-ink">{sessionText(s)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
