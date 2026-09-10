import { Phone } from "lucide-react";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TreatmentIcon } from "@/components/ui/icons";
import { Script } from "@/components/ui/section-header";
import { telHref } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";
import { treatments } from "@/lib/treatments";

export const metadata = pageMetadata({
  title: "Dental treatments in Thaltej, Ahmedabad",
  description:
    "Dental implants, root canal treatment, teeth cleaning, whitening, braces and aligners, extractions, kids dentistry, crowns and bridges — what each involves and what to expect.",
  path: "/treatments",
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        crumbs={[{ name: "Treatments", path: "/treatments" }]}
        title={
          <>
            Dental treatments, <Script>clearly</Script> explained
          </>
        }
        description="What each treatment involves and what to expect. Suitability is always confirmed after an examination, and results vary from person to person."
      />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <nav aria-label="Treatments on this page" className="no-scrollbar -mx-5 overflow-x-auto px-5">
            <ul className="flex gap-2 pb-1">
              {treatments.map((t) => (
                <li key={t.slug} className="shrink-0">
                  <a
                    href={`#${t.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand-600 hover:text-brand-800"
                  >
                    <TreatmentIcon name={t.icon} className="size-4 text-brand-700" />
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 divide-y divide-line border-y border-line md:mt-14">
            {treatments.map((t) => (
              <article
                key={t.slug}
                id={t.slug}
                aria-labelledby={`${t.slug}-title`}
                className="grid gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-16"
              >
                <Reveal className="md:col-span-5">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <TreatmentIcon name={t.icon} className="size-7" />
                  </span>
                  <h2 id={`${t.slug}-title`} className="mt-6 font-serif text-[2.25rem] font-medium leading-tight text-ink md:text-[2.6rem]">
                    {t.name}
                  </h2>
                  <p className="mt-2 text-muted">{t.short}</p>
                </Reveal>
                <Reveal delay={0.08} className="md:col-span-7">
                  <p className="type-lead text-ink-soft">{t.overview}</p>
                  <h3 className="type-eyebrow mt-9 text-brand-800">What to expect</h3>
                  <ol className="mt-4 grid gap-3">
                    {t.expect.map((step, i) => (
                      <li key={step} className="flex gap-4 border-b border-dashed border-line pb-3 text-[0.9375rem] text-ink-soft last:border-b-0">
                        <span className="font-semibold tabular-nums text-brand-700">{String(i + 1).padStart(2, "0")}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <ButtonLink href={`/contact?treatment=${t.slug}#book`} withArrow>
                      Book a consultation
                    </ButtonLink>
                    <ButtonLink href={telHref} variant="secondary">
                      <Phone aria-hidden className="text-brand-700" />
                      Ask a question
                    </ButtonLink>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
            The information on this page is general and isn&apos;t a substitute for a personal examination. Your
            dentist will recommend treatment only after assessing your teeth and discussing your options with you.
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
