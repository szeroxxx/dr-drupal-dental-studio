"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Camera, MoveHorizontal } from "lucide-react";
import { ClinicImage } from "@/components/ui/clinic-image";

type BeforeAfterSliderProps = {
  label: string;
  before?: string | null;
  after?: string | null;
};

/**
 * Drag (mouse or touch) or use the arrow keys to compare. Vertical page scrolling stays native on
 * touch screens because the surface only claims horizontal pans.
 */
export function BeforeAfterSlider({ label, before, after }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromPointer = (clientX: number) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) updateFromPointer(event.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  return (
    <figure>
      <div
        ref={surfaceRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-card border border-line bg-white shadow-soft [touch-action:pan-y] has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand-600 has-[input:focus-visible]:ring-offset-2"
      >
        <ClinicImage src={after} alt={`${label} — after treatment`} label="After photo" tone="brand" bare className="absolute inset-0" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <ClinicImage src={before} alt={`${label} — before treatment`} label="Before photo" tone="deep" bare className="absolute inset-0" />
        </div>

        {!before && !after && (
          <span
            role="img"
            aria-label={`Photo placeholder: ${label}`}
            className="pointer-events-none absolute left-1/2 top-4 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-200 bg-white/90 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-800"
          >
            <Camera aria-hidden className="size-3.5" />
            Photo placeholder
          </span>
        )}

        <div aria-hidden className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(23_36_46/0.06)]" />
          <div className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand-700 shadow-lift">
            <MoveHorizontal className="size-5" />
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-soft">
          Before
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-soft">
          After
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(position)}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare before and after: ${label}`}
          className="sr-only"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-ink">{label}</span>
        <span className="text-muted">Drag to compare</span>
      </figcaption>
    </figure>
  );
}
