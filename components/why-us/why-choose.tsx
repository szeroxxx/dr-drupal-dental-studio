import { ClipboardList, Clock, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { IconChip } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { clinic } from "@/lib/clinic-data";

// VERIFY — keep each point true to how the studio actually works; edit freely.
const reasons = [
  {
    icon: Stethoscope,
    title: "Doctor-led care",
    text: `Your treatment is planned by ${clinic.dentist.name}, ${clinic.dentist.qualifications.join(", ")}.`,
  },
  {
    icon: ClipboardList,
    title: "Explained, never rushed",
    text: "Options, timelines and costs are discussed before treatment begins.",
  },
  {
    icon: HeartHandshake,
    title: "Comfort-conscious",
    text: "Local anaesthetic where it's needed, and regular check-ins as we go.",
  },
  {
    icon: ShieldCheck,
    title: "Hygiene first",
    text: "Sterilised instruments and a clean, calm treatment room.",
  },
  {
    icon: Clock,
    title: "Easy to reach",
    text: "Morning and evening sessions, near Gulab Tower Road, Thaltej.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-canvas py-24 md:py-32" aria-labelledby="why-title">
      <Container>
        <Reveal className="rounded-[2rem] border border-line bg-white px-6 py-12 shadow-soft sm:px-10 md:py-16 lg:px-12">
          <SectionHeader
            id="why-title"
            align="center"
            animate={false}
            title={
              <>
                Why choose <Script>Dr. Dhrupal&apos;s</Script>?
              </>
            }
            description="The small things that make a dental visit feel different."
          />
          <Stagger
            as="ul"
            delay={0.15}
            className="mt-12 grid divide-y divide-line sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0 lg:grid-cols-5 lg:gap-x-0 lg:divide-x"
          >
            {reasons.map(({ icon: Icon, title, text }) => (
              <StaggerItem
                as="li"
                key={title}
                className="py-7 first:pt-0 last:pb-0 sm:py-5 sm:first:pt-5 lg:px-6 lg:py-1 lg:first:pl-0 lg:first:pt-1 lg:last:pr-0"
              >
                <IconChip>
                  <Icon aria-hidden />
                </IconChip>
                <h3 className="type-h3 mt-5 text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </Container>
    </section>
  );
}
