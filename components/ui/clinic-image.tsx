import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToothIcon } from "./icons";

type Tone = "brand" | "deep";

const tones: Record<Tone, string> = {
  brand:
    "bg-[radial-gradient(120%_90%_at_30%_20%,var(--color-brand-100),var(--color-brand-50)_55%,var(--color-canvas))]",
  deep: "bg-[radial-gradient(120%_90%_at_70%_20%,var(--color-canvas-deep),var(--color-canvas)_60%,#fff)]",
};

type ClinicImageProps = {
  src?: string | null;
  alt: string;
  /** Describes the photo that belongs here — shown on the placeholder until it's supplied. */
  label: string;
  sizes?: string;
  preload?: boolean;
  tone?: Tone;
  compact?: boolean;
  /** Tinted surface only — for layouts that place their own single placeholder label. */
  bare?: boolean;
  className?: string;
};

/**
 * Real clinic photography when `src` is set; otherwise an honest, clearly labelled placeholder
 * (never stock imagery passed off as the clinic).
 */
export function ClinicImage({
  src,
  alt,
  label,
  sizes = "100vw",
  preload = false,
  tone = "brand",
  compact = false,
  bare = false,
  className,
}: ClinicImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
      ) : bare ? (
        <div aria-hidden className={cn("absolute inset-0", tones[tone])}>
          <span className="absolute inset-0 [background-image:repeating-linear-gradient(135deg,rgb(11_111_117/0.045)_0_1px,transparent_1px_14px)]" />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder: ${label}`}
          className={cn("absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center", tones[tone])}
        >
          <span
            aria-hidden
            className="absolute inset-0 [background-image:repeating-linear-gradient(135deg,rgb(11_111_117/0.045)_0_1px,transparent_1px_14px)]"
          />
          <ToothIcon className={cn("relative text-brand-600/40", compact ? "size-9" : "size-14")} strokeWidth={1.1} />
          <span className="relative inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/85 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-800">
            <Camera aria-hidden className="size-3.5" />
            Photo placeholder
          </span>
          {!compact && <span className="relative max-w-[18rem] text-xs leading-relaxed text-muted">{label}</span>}
        </div>
      )}
    </div>
  );
}
