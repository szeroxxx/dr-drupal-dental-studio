import { MapPin, Navigation, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ClinicImage } from "@/components/ui/clinic-image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Script } from "@/components/ui/section-header";
import {
  clinic,
  defaultWhatsAppMessage,
  directionsHref,
  mapEmbedSrc,
  media,
  sessionText,
  telHref,
  whatsappHref,
} from "@/lib/clinic-data";
import { AppointmentForm } from "./appointment-form";

/** Booking form (first on mobile — it's the primary conversion) beside the map and visit details. */
export function VisitAndBook() {
  const wa = whatsappHref(defaultWhatsAppMessage);

  return (
    <section id="book" className="bg-canvas py-24 md:py-32" aria-labelledby="book-title">
      <Container className="grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:order-2 lg:col-span-6">
          <div className="h-full rounded-3xl border border-brand-100 bg-[linear-gradient(180deg,var(--color-brand-50),#fff_65%)] p-6 shadow-soft sm:p-10">
            <h2 id="book-title" className="type-h2 text-balance text-ink">
              Book your appointment <Script>today</Script>
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
              Choose a time that suits you — we&apos;ll confirm it with you directly.
            </p>
            <AppointmentForm className="mt-8" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 lg:order-1 lg:col-span-6">
          <Reveal delay={0.08} className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
            <ClinicImage src={media.location} alt="A softly lit contemporary clinical room with a reclining chair and dark cabinetry" label="A calm clinical setting" illustrative sizes="(min-width: 1024px) 50vw, 90vw" objectPosition="60% 46%" className="aspect-[16/9] w-full" />
            <details className="group border-t border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50">
                <span className="flex items-center gap-2"><MapPin aria-hidden className="size-4" /> Find the studio on the map</span>
                <span aria-hidden className="text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="relative aspect-[16/10] w-full bg-canvas-deep">
                <iframe
                  title={`Map showing ${clinic.name} in ${clinic.address.locality}, ${clinic.address.city}`}
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>
            </details>
          </Reveal>

          <Reveal delay={0.14} className="rounded-3xl border border-line bg-white p-7 shadow-soft md:p-9">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="type-eyebrow text-brand-800">Visit us</h3>
                <address className="mt-3 not-italic">
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-3 text-[0.9375rem] leading-relaxed text-ink transition-colors hover:text-brand-800"
                  >
                    <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brand-700" />
                    <span>
                      <span className="font-semibold">{clinic.name}</span>
                      <br />
                      {clinic.address.street}
                      <br />
                      {clinic.address.locality}, {clinic.address.city} {clinic.address.postalCode}
                    </span>
                  </a>
                </address>
              </div>
              <div>
                <h3 className="type-eyebrow text-brand-800">Hours</h3>
                <dl className="mt-3 space-y-2 text-[0.9375rem]">
                  {clinic.hours.sessions.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 border-b border-dashed border-line pb-2">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="font-semibold tabular-nums text-ink">{sessionText(s)}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted">{clinic.hours.note}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <ButtonLink href={directionsHref} size="sm">
                <Navigation aria-hidden />
                Get directions
              </ButtonLink>
              <ButtonLink href={telHref} size="sm" variant="secondary">
                <Phone aria-hidden className="text-brand-700" />
                {clinic.phone.display}
              </ButtonLink>
              {wa && (
                <ButtonLink href={wa} size="sm" variant="secondary">
                  <WhatsAppIcon className="text-[#1a9e55]" />
                  WhatsApp
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
