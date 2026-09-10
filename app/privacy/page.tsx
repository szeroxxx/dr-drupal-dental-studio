import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { clinic, telHref } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${clinic.name} handles the details you share through this website.`,
  path: "/privacy",
});

// VERIFY — have this reviewed against the clinic's actual data handling before launch.
const sections = [
  {
    title: "What we collect",
    body: "When you use the appointment form, we collect your name, mobile number, the treatment you're interested in, your preferred date and time, and anything you choose to tell us about your concern.",
  },
  {
    title: "How we use it",
    body: "Only to arrange and confirm your appointment and to contact you about it. We don't sell your details or use them for unrelated marketing.",
  },
  {
    title: "WhatsApp",
    body: "If you choose to send your request on WhatsApp, the message is sent from your own WhatsApp account and handled under WhatsApp's own privacy policy.",
  },
  {
    title: "Google Maps",
    body: "Our contact pages include an embedded Google Map. Google may set cookies or collect usage data when the map loads, under Google's privacy policy.",
  },
  {
    title: "Your choices",
    body: "You can ask us to show, correct or delete the details you've shared with us at any time by calling the studio.",
  },
  {
    title: "Medical information",
    body: "Content on this website is general information and isn't a substitute for a personal examination or professional advice.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        crumbs={[{ name: "Privacy policy", path: "/privacy" }]}
        title="Privacy policy"
        description="Last updated 10 September 2026."
      />
      <section className="bg-white py-16 md:py-24">
        <Container className="max-w-[48rem]">
          {sections.map((s) => (
            <div key={s.title} className="border-b border-line py-8 first:pt-0 last:border-b-0">
              <h2 className="font-serif text-[1.75rem] font-medium text-ink">{s.title}</h2>
              <p className="mt-3 text-[1.0625rem] leading-[1.8] text-ink-soft">{s.body}</p>
            </div>
          ))}
          <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink-soft">
            Questions? Call {clinic.name} on{" "}
            <a href={telHref} className="font-semibold text-brand-700 underline underline-offset-4">
              {clinic.phone.display}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
