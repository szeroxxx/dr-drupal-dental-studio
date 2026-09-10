import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-[transform,border-color,box-shadow] duration-500 ease-soft hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600 has-[a:focus-visible]:ring-offset-2 md:p-8">
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-800">{post.category}</span>
        <span className="text-muted">{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-6 text-balance font-serif text-[1.75rem] font-medium leading-tight text-ink">
        <Link href={`/blog/${post.slug}`} className="outline-none after:absolute after:inset-0 after:rounded-3xl">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-8 text-sm">
        <time dateTime={post.publishedAt} className="text-muted">
          {formatDate(post.publishedAt)}
        </time>
        <span className="inline-flex items-center gap-1.5 font-semibold text-brand-700">
          Read
          <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
