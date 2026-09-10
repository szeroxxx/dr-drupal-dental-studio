import type { ReactNode } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { IconChip } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  clinic,
  defaultWhatsAppMessage,
  directionsHref,
  sessionText,
  telHref,
  whatsappHref,
} from "@/lib/clinic-data";

type ContactCard = { icon: ReactNode; title: string; value: ReactNode; href: string; action: string };

export function ContactCards() {
  const wa = whatsappHref(defaultWhatsAppMessage);
  const cards: ContactCard[] = [
    { icon: <Phone aria-hidden />, title: "Call", value: clinic.phone.display, href: telHref, action: "Call now" },
    ...(wa
      ? [{ icon: <WhatsAppIcon />, title: "WhatsApp", value: clinic.phone.display, href: wa, action: "Send a message" }]
      : []),
    ...(clinic.email
      ? [{ icon: <Mail aria-hidden />, title: "Email", value: clinic.email, href: `mailto:${clinic.email}`, action: "Write to us" }]
      : []),
    {
      icon: <MapPin aria-hidden />,
      title: "Address",
      value: `${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.city} ${clinic.address.postalCode}`,
      href: directionsHref,
      action: "Get directions",
    },
    {
      icon: <Clock aria-hidden />,
      title: "Hours",
      value: clinic.hours.sessions.map((s) => (
        <span key={s.label} className="block">
          {s.label}: {sessionText(s)}
        </span>
      )),
      href: clinic.links.googleProfile,
      action: "View on Google",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20" aria-label="Contact details">
      <Container>
        <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const external = card.href.startsWith("http");
            return (
              <StaggerItem as="li" key={card.title}>
                <a
                  href={card.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-[transform,border-color,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift"
                >
                  <IconChip>{card.icon}</IconChip>
                  <h2 className="type-h3 mt-5 text-ink">{card.title}</h2>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{card.value}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                    {card.action}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
