import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { media } from "@/lib/clinic-data";
import { BeforeAfterSlider } from "./before-after-slider";

export function Transformations() {
  return (
    <section className="bg-canvas py-24 md:py-32" aria-labelledby="transformations-title">
      <Container>
        <SectionHeader
          id="transformations-title"
          align="center"
          eyebrow="Results"
          title={
            <>
              <Script>Smile</Script> transformations
            </>
          }
          description="Before-and-after photos from the studio will appear here — published only with each patient's written consent."
        />
        <Stagger className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {media.transformations.map((t) => (
            <StaggerItem key={t.label}>
              <BeforeAfterSlider label={t.label} before={t.before} after={t.after} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12 flex justify-center">
          <ButtonLink href="/gallery" variant="secondary" withArrow>
            View the gallery
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
