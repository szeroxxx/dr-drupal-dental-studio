import { Reveal } from "@/components/motion/reveal";
import { ClinicImage } from "@/components/ui/clinic-image";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { media } from "@/lib/clinic-data";
import { ProcessSteps } from "./process-steps";

export const processSteps = [
  { title: "Consultation", text: "Tell us what's bothering you, or what you'd like to change about your smile." },
  { title: "Diagnosis", text: "A careful examination of teeth, gums and bite, with X-rays only where needed." },
  { title: "Treatment plan", text: "Your options, timelines and costs explained in plain language — before anything begins." },
  { title: "Treatment", text: "Carried out at a pace that feels comfortable, with check-ins along the way." },
  { title: "Follow-up care", text: "Aftercare guidance and review visits to keep your teeth and gums healthy." },
];

export function Process() {
  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="process-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="process-title"
              eyebrow="How it works"
              title={
                <>
                  Our treatment <Script>process</Script>
                </>
              }
              description="What happens after you book — no surprises, and no pressure."
            />
            <Reveal delay={0.1} className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end">
              <ClinicImage
                src={media.process}
                alt="Treatment room at the studio"
                label="Treatment room at the studio"
                sizes="(min-width: 640px) 18rem, 90vw"
                tone="deep"
                className="aspect-[4/3] w-full shrink-0 rounded-card border border-line sm:w-72"
              />
              <p className="max-w-[12rem] text-sm leading-relaxed text-muted">
                A simple, comfortable and transparent process.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ProcessSteps steps={processSteps} />
        </div>
      </Container>
    </section>
  );
}
