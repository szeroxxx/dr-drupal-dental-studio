import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, CircleCheck, Phone } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatDate, getPost, getPosts, type BlogBlock } from "@/lib/blog";
import { clinic, telHref } from "@/lib/clinic-data";
import { pageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article" });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 font-serif text-[1.9rem] font-medium leading-tight text-ink">{block.text}</h2>;
    case "p":
      return <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink-soft">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 grid gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[1.0625rem] leading-relaxed text-ink-soft">
              <CircleCheck aria-hidden className="mt-1 size-5 shrink-0 text-brand-600" />
              {item}
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="bg-canvas pb-14 pt-[128px] md:pb-20 md:pt-[152px]">
          <Container className="max-w-[52rem]">
            <Link
              href="/blog"
              className="hero-rise inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-brand-800"
            >
              <ChevronLeft aria-hidden className="size-4" />
              All articles
            </Link>
            <p className="hero-rise mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-800">{post.category}</span>
              <time dateTime={post.publishedAt} className="text-muted">
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-muted">· {post.readingMinutes} min read</span>
            </p>
            <h1 className="hero-rise type-h1 mt-6 text-balance text-ink">{post.title}</h1>
            <p className="hero-rise type-lead mt-6 text-muted">{post.excerpt}</p>
          </Container>
        </header>

        <Container className="grid max-w-[76rem] gap-12 py-16 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-7 lg:sticky lg:top-28">
              <p className="font-serif text-2xl font-medium leading-snug text-ink">Questions about your own teeth?</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Book a consultation at {clinic.name}, or call the studio for a quick chat.
              </p>
              <div className="mt-6 grid gap-2.5">
                <ButtonLink href="/contact#book" withArrow>
                  Book a consultation
                </ButtonLink>
                <ButtonLink href={telHref} variant="secondary">
                  <Phone aria-hidden className="text-brand-700" />
                  {clinic.phone.display}
                </ButtonLink>
              </div>
            </div>
          </aside>
        </Container>
      </article>

      {more.length > 0 && (
        <section className="border-t border-line bg-canvas py-16 md:py-24" aria-labelledby="more-title">
          <Container>
            <h2 id="more-title" className="type-h2 text-ink">
              More articles
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {more.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
