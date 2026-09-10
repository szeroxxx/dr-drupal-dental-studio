import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { TreatmentIcon } from "@/components/ui/icons";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { treatments } from "@/lib/treatments";

export function TreatmentsSection() {
  return (
    <section id="treatments" className="bg-white py-24 md:py-32" aria-labelledby="treatments-title">
      <Container>
        <SectionHeader
          id="treatments-title"
          align="center"
          eyebrow="Treatments"
          title={
            <>
              Our dental <Script>treatments</Script>
            </>
          }
          description="General, restorative and cosmetic dentistry — planned around you and explained before anything begins."
        />

        <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {treatments.map((t) => (
            <StaggerItem as="li" key={t.slug}>
              <Link
                href={`/treatments#${t.slug}`}
                className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-[transform,border-color,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-6"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-500 ease-soft group-hover:bg-brand-700 group-hover:text-white">
                  <TreatmentIcon
                    name={t.icon}
                    className="size-6 transition-transform duration-500 ease-soft group-hover:-translate-y-0.5 group-hover:scale-105"
                  />
                </span>
                <h3 className="mt-6 text-base font-semibold leading-snug text-ink sm:text-[1.0625rem]">{t.name}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted sm:text-sm">{t.short}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                  Learn more
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 text-center text-[0.9375rem] text-muted">
          Not sure what you need?{" "}
          <Link href="#book" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
            Book a consultation
          </Link>{" "}
          and we&apos;ll guide you.
        </p>
      </Container>
    </section>
  );
}
