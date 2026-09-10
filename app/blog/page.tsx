import { BlogIndex } from "@/components/blog/blog-index";
import { CtaBand } from "@/components/layout/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Script } from "@/components/ui/section-header";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dental care guides & advice",
  description: "Practical guides on dental care, oral health, treatments and prevention from the studio in Thaltej, Ahmedabad.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        crumbs={[{ name: "Blog", path: "/blog" }]}
        title={
          <>
            Guides for <Script>healthier</Script> smiles
          </>
        }
        description="Straightforward advice on caring for your teeth and knowing what to expect from treatment."
      />
      <section className="bg-white py-16 md:py-24">
        <Container>
          <BlogIndex posts={getPosts()} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
