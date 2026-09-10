import { CalendarCheck, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Script } from "@/components/ui/section-header";
import { clinic, defaultWhatsAppMessage, telHref, whatsappHref } from "@/lib/clinic-data";

export function CtaBand({ bookHref = "/contact#book" }: { bookHref?: string }) {
  const wa = whatsappHref(defaultWhatsAppMessage);

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-brand-800 px-6 py-14 text-center sm:px-12 md:py-20">
          <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-80 rounded-full border border-white/10" />
          <div aria-hidden className="absolute -bottom-32 -right-20 -z-10 size-[26rem] rounded-full border border-white/10" />
          <div aria-hidden className="absolute -bottom-16 -right-4 -z-10 size-72 rounded-full bg-brand-500/20 blur-3xl" />
          <h2 className="type-h2 text-balance text-white">
            Ready when <Script className="text-brand-200">you are</Script>
          </h2>
          <p className="type-lead mx-auto mt-4 max-w-lg text-white/80">
            Book a consultation, call the studio, or send a message on WhatsApp — whichever is easiest for you.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={bookHref} variant="light" size="lg" withArrow>
              <CalendarCheck aria-hidden />
              Book an Appointment
            </ButtonLink>
            <ButtonLink href={telHref} variant="outlineLight" size="lg">
              <Phone aria-hidden />
              {clinic.phone.display}
            </ButtonLink>
            {wa && (
              <ButtonLink href={wa} variant="outlineLight" size="lg">
                <WhatsAppIcon />
                WhatsApp
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
