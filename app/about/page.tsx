import { DentistSection } from "@/components/dentist/dentist-section";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Process } from "@/components/process/process";
import { TrustStrip } from "@/components/trust/trust-strip";
import { Script } from "@/components/ui/section-header";
import { WhyChoose } from "@/components/why-us/why-choose";
import { clinic } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `About the studio & ${clinic.dentist.name}`,
  description: `Meet ${clinic.dentist.name} (${clinic.dentist.qualifications.join(", ")}) and the calm, doctor-led approach at ${clinic.name} in Thaltej, Ahmedabad.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        crumbs={[{ name: "About", path: "/about" }]}
        title={
          <>
            A calm studio for <Script>careful</Script> dentistry
          </>
        }
        description={`${clinic.name} is a doctor-led dental clinic in Thaltej, Ahmedabad — built around unhurried appointments and clear explanations.`}
      />
      <DentistSection showMore={false} />
      <TrustStrip />
      <WhyChoose />
      <Process />
      <CtaBand />
    </>
  );
}
