import { SmileGallery } from "@/components/gallery/smile-gallery";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ClinicImage } from "@/components/ui/clinic-image";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { media } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Gallery — smile inspiration & dental care",
  description: "Explore smile care and modern clinical settings through a curated collection of illustrative dental photography.",
  path: "/gallery",
});

const tileLayout = [
  "col-span-2 row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
];

export default function GalleryPage() {
  const hasResults = media.transformations.some((photo) => photo.before && photo.after);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        title={
          <>
            The art of <Script>smile care</Script>
          </>
        }
        description="A closer look at dental care, from the first conversation to a thoughtfully planned visit. Stock photography is illustrative and does not depict our clinic or patients."
      />

      <section className="bg-white py-20 md:py-28" aria-labelledby="results-title">
        <Container>
          <SectionHeader
            id="results-title"
            title={hasResults ? "Before & after" : "Smile inspiration"}
            description={hasResults ? "Patient photos shared with written consent. Drag the handle or use your arrow keys to compare." : "Care begins with understanding your smile. Explore the treatments that may be part of your individual plan."}
          />
          <SmileGallery />
        </Container>
      </section>

      <section className="bg-canvas py-20 md:py-28" aria-labelledby="studio-title">
        <Container>
          <SectionHeader
            id="studio-title"
            title={
              <>
                Space for <Script>thoughtful care</Script>
              </>
            }
            description="Modern dental settings and moments of care. This collection uses representative photography, rather than photographs of Dr. Dhrupal's Dental Studio."
          />
          <Stagger className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-4">
            {media.gallery.map((photo, i) => (
              <StaggerItem key={photo.label} className={cn(tileLayout[i % tileLayout.length])}>
                <figure className="relative size-full overflow-hidden rounded-card border border-line">
                  <ClinicImage
                    src={photo.src}
                    alt={`${photo.alt} — representative photography`}
                    label={photo.label}
                    sizes={i === 0 || i === 3 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    objectPosition={photo.position}
                    className="size-full"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-4 pt-12 text-white">
                    <span className="block text-sm font-semibold">{photo.label}</span>
                    <span className="mt-1 block text-[10px] tracking-[0.04em] text-white/90">Representative photography</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
