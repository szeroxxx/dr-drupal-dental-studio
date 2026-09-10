import { ChevronDown } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { clinic, fullAddress, sessionText } from "@/lib/clinic-data";
import { faqSchema } from "@/lib/structured-data";

/** Only questions whose answers are established facts about the studio. */
export const faqs = [
  {
    question: `Where is ${clinic.name}?`,
    answer: `The studio is at ${fullAddress}. Use "Get directions" on this page for turn-by-turn directions in Google Maps.`,
  },
  {
    question: "What are the studio's timings?",
    answer: `Morning session ${sessionText(clinic.hours.sessions[0])} and evening session ${sessionText(
      clinic.hours.sessions[1],
    )}. ${clinic.hours.note}`,
  },
  {
    question: "How do I book an appointment?",
    answer: `Use the booking form on this page, call ${clinic.phone.display}, or send a message on WhatsApp. Your appointment is confirmed once the studio gets back to you.`,
  },
  {
    question: "What should I bring to my first visit?",
    answer: "A list of any medicines you take, and any previous dental X-rays or reports if you have them.",
  },
];

export function Faq() {
  return (
    <section className="bg-white py-24 md:py-32" aria-labelledby="faq-title">
      <JsonLd data={faqSchema(faqs)} />
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader
            id="faq-title"
            eyebrow="FAQ"
            title={
              <>
                Good to <Script>know</Script>
              </>
            }
            description="Quick answers about visiting the studio."
          />
        </div>
        <Stagger className="divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <StaggerItem key={faq.question}>
              <details className="group py-2">
                <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-md py-4 text-lg font-semibold text-ink transition-colors hover:text-brand-800">
                  {faq.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-[transform,border-color] duration-500 ease-soft group-open:rotate-180 group-open:border-brand-600">
                    <ChevronDown aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 pr-12 text-[0.9375rem] leading-relaxed text-muted">{faq.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
