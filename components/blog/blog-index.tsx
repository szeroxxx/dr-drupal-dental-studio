"use client";

import { useState } from "react";
import { blogCategories, type BlogCategory, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);
  // Categories appear as soon as they have at least one article.
  const filters: (BlogCategory | "All")[] = ["All", ...blogCategories.filter((c) => posts.some((p) => p.category === c))];

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {filters.map((f) => {
          const count = f === "All" ? posts.length : posts.filter((p) => p.category === f).length;
          const active = f === category;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setCategory(f)}
              aria-pressed={active}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
                active
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-line-strong bg-white text-ink-soft hover:border-brand-600 hover:text-brand-800",
              )}
            >
              {f}
              <span className={cn("ml-2 tabular-nums", active ? "text-white/75" : "text-muted")}>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl border border-dashed border-line-strong bg-canvas px-6 py-14 text-center text-muted">
          No articles in {category} yet — new guides are on the way.
        </p>
      )}
    </div>
  );
}
