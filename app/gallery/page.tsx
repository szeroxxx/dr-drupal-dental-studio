import { BeforeAfterSlider } from "@/components/gallery/before-after-slider";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ClinicImage } from "@/components/ui/clinic-image";
import { Container } from "@/components/ui/container";
import { Script, SectionHeader } from "@/components/ui/section-header";
import { clinic, media } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Gallery — smile transformations & the studio",
  description: `Before-and-after smile transformations and a look inside ${clinic.name} in Thaltej, Ahmedabad.`,
  path: "/gallery",
});

const tileLayout = [
  "col-span-2 row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        title={
          <>
            Smiles & the <Script>studio</Script>
          </>
        }
        description="Before-and-after results and a look inside the studio. Patient photos are published only with written consent."
      />

      <section className="bg-white py-20 md:py-28" aria-labelledby="results-title">
        <Container>
          <SectionHeader
            id="results-title"
            title="Before & after"
            description="Drag the handle — or focus it and use your arrow keys — to compare."
          />
          <Stagger className="mt-12 grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {media.transformations.map((t) => (
              <StaggerItem key={t.label}>
                <BeforeAfterSlider label={t.label} before={t.before} after={t.after} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-canvas py-20 md:py-28" aria-labelledby="studio-title">
        <Container>
          <SectionHeader
            id="studio-title"
            title={
              <>
                Inside the <Script>studio</Script>
              </>
            }
            description={`${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.city}.`}
          />
          <Stagger className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[15rem] md:grid-cols-4">
            {media.gallery.map((photo, i) => (
              <StaggerItem key={photo.label} className={cn(tileLayout[i % tileLayout.length])}>
                <ClinicImage
                  src={photo.src}
                  alt={`${photo.label} at ${clinic.name}`}
                  label={photo.label}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  tone={i % 2 ? "deep" : "brand"}
                  compact={i !== 0}
                  className="size-full rounded-card border border-line"
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
