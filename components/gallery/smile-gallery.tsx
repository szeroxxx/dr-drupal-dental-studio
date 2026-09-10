import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ClinicImage } from "@/components/ui/clinic-image";
import { media } from "@/lib/clinic-data";
import { BeforeAfterSlider } from "./before-after-slider";

/** Genuine consented results take precedence; stock scenes are never presented as outcomes. */
export function SmileGallery() {
  const results = media.transformations.filter((photo) => photo.before && photo.after);

  return (
    <Stagger className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
      {results.length > 0
        ? results.map((photo) => (
            <StaggerItem key={photo.label}>
              <BeforeAfterSlider label={photo.label} before={photo.before} after={photo.after} />
            </StaggerItem>
          ))
        : media.inspiration.map((photo) => (
            <StaggerItem key={photo.label}>
              <Link href={photo.href} className="group block h-full overflow-hidden rounded-card border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift">
                <ClinicImage
                  src={photo.src}
                  alt={photo.alt}
                  label={photo.label}
                  sizes="(min-width: 768px) 32vw, 90vw"
                  objectPosition={photo.position}
                  illustrative
                  className="aspect-[4/3] w-full [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.035]"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="type-h3 text-ink">{photo.label}</h3>
                    <ArrowUpRight aria-hidden className="size-5 shrink-0 text-brand-700" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{photo.text}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
    </Stagger>
  );
}
