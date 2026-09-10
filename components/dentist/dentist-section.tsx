import { CircleCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ClinicImage } from "@/components/ui/clinic-image";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { clinic, media } from "@/lib/clinic-data";

/** Dentist introduction. Only published credentials are listed — add more in lib/clinic-data.ts. */
export function DentistSection({ showMore = true }: { showMore?: boolean }) {
  const d = clinic.dentist;
  const points = [
    ...d.credentials,
    ...(d.yearsOfExperience ? [`${d.yearsOfExperience}+ years in clinical practice`] : []),
    ...(d.registrationNumber ? [`Registration no. ${d.registrationNumber}`] : []),
    `Leads clinical care at ${clinic.name}`,
    `Rated ${clinic.ratings.google.value.toFixed(1)} by patients on Google`,
    "Treatment options explained before anything begins",
  ];

  return (
    <section id="about" className="bg-canvas py-24 md:py-32" aria-labelledby="dentist-title">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden className="absolute -left-4 -top-4 hidden size-full rounded-[2rem] border border-brand-200 sm:block" />
          <ClinicImage
            src={media.dentist}
            alt={`${d.name}, ${d.title.toLowerCase()} at ${clinic.name}`}
            label={`Portrait of ${d.name} at the studio`}
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="relative aspect-[4/5] w-full rounded-[2rem] border border-line shadow-soft"
          />
          <div className="absolute -bottom-7 left-5 right-5 rounded-2xl border border-line bg-white/95 p-5 shadow-lift backdrop-blur sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="font-serif text-2xl font-medium leading-tight text-ink">{d.name}</p>
            <p className="mt-1 text-sm text-muted">
              {d.qualifications.join(", ")} · {d.title}
            </p>
          </div>
        </Reveal>

        <div className="pt-6 lg:col-span-6 lg:col-start-7 lg:pt-0">
          <SectionHeader
            id="dentist-title"
            eyebrow="Meet your dentist"
            title={
              <>
                Trusted dental care, led by <Script>{d.shortName}</Script>
              </>
            }
          />
          <Reveal delay={0.08}>
            <p className="type-lead mt-6 text-ink-soft">
              {d.name} leads the studio&apos;s clinical care — from your first consultation to your follow-up
              visits. The approach is simple: listen properly, explain your options in plain language, and never
              rush a decision that&apos;s yours to make.
            </p>
          </Reveal>

          <Stagger as="ul" className="mt-8 grid gap-3.5" delay={0.1}>
            {points.map((point) => (
              <StaggerItem as="li" key={point} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {point}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
            {showMore && (
              <ButtonLink href="/about" withArrow>
                Know more
              </ButtonLink>
            )}
            <ButtonLink href={showMore ? "#book" : "/contact#book"} variant="secondary">
              Book a consultation
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
