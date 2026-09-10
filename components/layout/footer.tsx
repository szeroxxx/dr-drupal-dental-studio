import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GoogleIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Stars } from "@/components/ui/stars";
import {
  clinic,
  defaultWhatsAppMessage,
  directionsHref,
  sessionText,
  telHref,
  whatsappHref,
} from "@/lib/clinic-data";
import { mainNav } from "@/lib/site";
import { treatments } from "@/lib/treatments";

const linkClass = "text-[0.9375rem] text-ink-soft transition-colors hover:text-brand-800";

function FooterHeading({ children }: { children: ReactNode }) {
  return <h2 className="type-eyebrow text-ink">{children}</h2>;
}

export function Footer() {
  const wa = whatsappHref(defaultWhatsAppMessage);

  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" aria-label={`${clinic.name} — home`} className="inline-block rounded-md">
            <Image src="/brand/logo.png" alt={clinic.brandName} width={1200} height={379} sizes="200px" className="h-14 w-auto" />
          </Link>
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
            A calm, doctor-led dental studio in Thaltej, Ahmedabad — careful treatment, explained clearly.
          </p>
          <a
            href={clinic.links.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-line py-2 pl-2 pr-4 text-sm transition-colors hover:border-brand-300"
          >
            <span className="grid size-8 place-items-center rounded-full bg-canvas">
              <GoogleIcon className="size-4" />
            </span>
            <span className="font-semibold text-ink">{clinic.ratings.google.value.toFixed(1)}</span>
            <Stars value={clinic.ratings.google.value} size="size-3.5" />
            <span className="text-muted">on Google</span>
          </a>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Treatments</FooterHeading>
          <ul className="mt-5 space-y-3">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments#${t.slug}`} className={linkClass}>
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Visit & contact</FooterHeading>
          <ul className="mt-5 space-y-4 text-[0.9375rem]">
            <li>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClass}`}>
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
                <span>
                  {clinic.address.street}, {clinic.address.locality}, {clinic.address.city} {clinic.address.postalCode}
                </span>
              </a>
            </li>
            <li>
              <a href={telHref} className={`flex gap-3 ${linkClass}`}>
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
                {clinic.phone.display}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClass}`}>
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-brand-700" />
                  WhatsApp the studio
                </a>
              </li>
            )}
            {clinic.email && (
              <li>
                <a href={`mailto:${clinic.email}`} className={`flex gap-3 ${linkClass}`}>
                  <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
                  {clinic.email}
                </a>
              </li>
            )}
            <li className="flex gap-3 text-ink-soft">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
              <span>
                {clinic.hours.sessions.map((s) => (
                  <span key={s.label} className="block">
                    {s.label}: {sessionText(s)}
                  </span>
                ))}
              </span>
            </li>
          </ul>
          {clinic.social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4">
              {clinic.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-brand-800">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href={clinic.links.googleProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-800"
                >
                  Google Business Profile
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
