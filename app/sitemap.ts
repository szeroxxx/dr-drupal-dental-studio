import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

const lastUpdated = new Date("2026-09-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/treatments", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/gallery", priority: 0.6 },
    { path: "/blog", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: lastUpdated,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const posts = getPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
