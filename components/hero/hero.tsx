import type { CSSProperties } from "react";
import { CalendarCheck, Clock, MapPin, Phone, Star, Stethoscope } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { IconChip } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Script } from "@/components/ui/section-header";
import { clinic, formatTime, telHref } from "@/lib/clinic-data";
import { HeroVisual } from "./hero-visual";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const lastClose = clinic.hours.sessions.at(-1)?.closes;
  const trust = [
    {
      icon: Star,
      title: `${clinic.ratings.google.value.toFixed(1)} rated`,
      text: clinic.ratings.google.count ? `${clinic.ratings.google.count} Google reviews` : "on Google",
    },
    { icon: Stethoscope, title: "Doctor-led", text: clinic.dentist.shortName },
    { icon: Clock, title: lastClose ? `Till ${formatTime(lastClose)}` : "Evenings", text: "evening hours" },
    { icon: MapPin, title: clinic.address.locality, text: "Gulab Tower Rd" },
  ];

  return (
    <section className="relative overflow-hidden bg-canvas pb-20 pt-[112px] md:pt-[136px] lg:pb-28" aria-labelledby="hero-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] -top-[25%] size-[62rem] rounded-full bg-[radial-gradient(closest-side,rgb(0_173_181/0.10),transparent)]"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 xl:pr-6">
          <div className="hero-rise" style={delay(0)}>
            <Eyebrow>
              <span>
                Dental clinic · Thaltej<span className="hidden min-[400px]:inline">, Ahmedabad</span>
              </span>
            </Eyebrow>
          </div>

          <h1 id="hero-title" className="type-display mt-7 text-ink">
            <span className="hero-rise block" style={delay(80)}>
              Confident smiles,
            </span>
            <span className="hero-rise block" style={delay(170)}>
              cared for <Script className="whitespace-nowrap">every day</Script>
            </span>
          </h1>

          <p className="hero-rise type-lead mt-7 max-w-[33rem] text-ink-soft" style={delay(260)}>
            A calm, doctor-led dental studio in Thaltej, Ahmedabad. Careful treatment, clear explanations and
            appointments that fit around your day.
          </p>

          <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(340)}>
            <ButtonLink href="#book" size="lg" withArrow>
              <CalendarCheck aria-hidden />
              Book an Appointment
            </ButtonLink>
            <ButtonLink href={telHref} variant="secondary" size="lg">
              <Phone aria-hidden className="text-brand-700" />
              Call {clinic.phone.display}
            </ButtonLink>
          </div>

          <ul
            className="hero-rise mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-4 lg:max-w-md lg:grid-cols-2 lg:gap-x-8 xl:max-w-none xl:grid-cols-4 xl:gap-x-4"
            style={delay(440)}
          >
            {trust.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <IconChip className="size-10 border border-line bg-white shadow-soft">
                  <Icon aria-hidden />
                </IconChip>
                <span className="leading-tight">
                  <span className="block whitespace-nowrap text-sm font-semibold text-ink">{title}</span>
                  <span className="block text-xs text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
