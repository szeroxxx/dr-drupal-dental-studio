import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { breadcrumbSchema } from "@/lib/structured-data";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Trail after "Home". The last item is the current page. */
  crumbs: { name: string; path: string }[];
};

export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <section className="relative overflow-hidden bg-canvas pb-16 pt-[128px] md:pb-20 md:pt-[152px]">
      <JsonLd data={breadcrumbSchema(trail)} />
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 size-[620px] rounded-full border border-brand-200/70" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[440px] rounded-full border border-brand-200/50" />
      <Container className="relative">
        <nav aria-label="Breadcrumb" className="hero-rise mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            {trail.map((crumb, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-1.5">
                  {last ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {crumb.name}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.path} className="transition-colors hover:text-brand-800">
                        {crumb.name}
                      </Link>
                      <ChevronRight aria-hidden className="size-3.5" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="hero-rise" style={{ "--d": "90ms" } as CSSProperties}>
          <SectionHeader as="h1" animate={false} eyebrow={eyebrow} title={title} description={description} />
        </div>
      </Container>
    </section>
  );
}
