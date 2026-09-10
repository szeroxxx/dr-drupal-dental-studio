import { VisitAndBook } from "@/components/appointment/visit-and-book";
import { DentistSection } from "@/components/dentist/dentist-section";
import { Transformations } from "@/components/gallery/transformations";
import { Hero } from "@/components/hero/hero";
import { Process } from "@/components/process/process";
import { Testimonials } from "@/components/testimonials/testimonials";
import { TreatmentsSection } from "@/components/treatments/treatments-section";
import { TrustStrip } from "@/components/trust/trust-strip";
import { WhyChoose } from "@/components/why-us/why-choose";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TreatmentsSection />
      <DentistSection />
      <TrustStrip />
      <Transformations />
      <Testimonials />
      <WhyChoose />
      <Process />
      <VisitAndBook />
    </>
  );
}
