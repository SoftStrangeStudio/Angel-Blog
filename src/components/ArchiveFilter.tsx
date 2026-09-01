"use client";

import { useEffect, useMemo, useState } from "react";
import type { PostMeta } from "@/lib/post-model";
import { PostCard } from "@/components/PostCard";

export function ArchiveFilter({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState("All writing");

  useEffect(() => {
    const theme = new URLSearchParams(window.location.search).get("theme");
    if (theme && categories.includes(theme)) setActiveCategory(theme);
  }, [categories]);

  const filteredPosts = useMemo(
    () =>
      activeCategory === "All writing"
        ? posts
        : posts.filter((post) => post.category.includes(activeCategory)),
    [activeCategory, posts],
  );

  function chooseCategory(category: string) {
    setActiveCategory(category);
    const url = new URL(window.location.href);
    if (category === "All writing") url.searchParams.delete("theme");
    else url.searchParams.set("theme", category);
    window.history.replaceState({}, "", url);
  }

  return (
    <div className="archive-browser">
      <div className="archive-filters" aria-label="Filter writing by theme">
        {["All writing", ...categories].map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={activeCategory === category}
            onClick={() => chooseCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="archive-result" aria-live="polite">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? "piece" : "pieces"}
        {activeCategory === "All writing" ? "" : ` about ${activeCategory.toLowerCase()}`}.
      </p>
      <div className="post-list">
        {filteredPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
