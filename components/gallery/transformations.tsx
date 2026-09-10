import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { media } from "@/lib/clinic-data";
import { SmileGallery } from "./smile-gallery";

export function Transformations() {
  const hasResults = media.transformations.some((photo) => photo.before && photo.after);
  return (
    <section className="bg-canvas py-24 md:py-32" aria-labelledby="transformations-title">
      <Container>
        <SectionHeader
          id="transformations-title"
          align="center"
          eyebrow={hasResults ? "Results" : "Your smile, your way"}
          title={
            <>
              <Script>Smile</Script> {hasResults ? "transformations" : "inspiration"}
            </>
          }
          description={hasResults ? "Patient photographs shared with written consent. Every treatment plan is individual." : "Explore the possibilities for your smile. These photographs illustrate dental care and are not patient results from the studio."}
        />
        <SmileGallery />
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/gallery" variant="secondary" withArrow>
            View the gallery
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
