import { VisitAndBook } from "@/components/appointment/visit-and-book";
import { ContactCards } from "@/components/contact/contact-cards";
import { Faq } from "@/components/contact/faq";
import { PageHero } from "@/components/layout/page-hero";
import { Script } from "@/components/ui/section-header";
import { clinic, fullAddress } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact, directions & appointments",
  description: `Book an appointment at ${clinic.name}, ${fullAddress}. Call ${clinic.phone.display}, WhatsApp the studio, or get directions.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title={
          <>
            Visit the <Script>studio</Script>
          </>
        }
        description="Call, WhatsApp or book online — we'll confirm your appointment with you directly."
      />
      <ContactCards />
      <VisitAndBook />
      <Faq />
    </>
  );
}
