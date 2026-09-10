import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Script } from "@/components/ui/section-header";
import { clinic, telHref } from "@/lib/clinic-data";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-canvas pb-20 pt-[140px]">
      <Container className="max-w-2xl text-center">
        <p className="type-eyebrow text-brand-800">Error 404</p>
        <h1 className="type-h1 mt-5 text-ink">
          This page is <Script>missing</Script>
        </h1>
        <p className="type-lead mx-auto mt-5 max-w-md text-muted">
          The link may be out of date. Head back home, or get in touch with the studio directly.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href={telHref} variant="secondary">
            <Phone aria-hidden className="text-brand-700" />
            {clinic.phone.display}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
