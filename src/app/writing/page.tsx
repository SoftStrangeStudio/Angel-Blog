import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveFilter } from "@/components/ArchiveFilter";
import { MemoryMark } from "@/components/MemoryMark";
import { getAllCategories, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing archive",
  description:
    "Browse personal writing about grief, chronic illness, mental health, memory, love, and care by theme.",
  alternates: { canonical: "/writing/" },
};

export default function WritingPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main id="main-content">
      <section className="page-intro page-shell" aria-labelledby="archive-title">
        <div>
          <p className="eyebrow">The writing archive</p>
          <h1 id="archive-title">Find a page for what you are carrying.</h1>
        </div>
        <p className="page-intro__lede">
          These pieces are grouped by emotional thread rather than forced into a single,
          orderly story. Begin anywhere. Leave whenever you need to.
        </p>
      </section>

      <section className="memory-shelf page-shell" aria-labelledby="memory-shelf-heading">
        <MemoryMark compact />
        <div>
          <p className="eyebrow">The memory shelf</p>
          <h2 id="memory-shelf-heading">A place for what should not disappear.</h2>
          <p>
            Stories about my mom, remembered objects, good days, painful days, and small
            details can sit beside one another without becoming a neat timeline.
          </p>
        </div>
        <Link
          className="button-link button-link--quiet"
          href="/writing/?theme=Grief%20and%20Motherhood"
        >
          Visit the shelf <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className="archive-section page-shell" aria-labelledby="all-writing-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">All public pages</p>
            <h2 id="all-writing-heading">Browse by thread</h2>
          </div>
          <p>Only intentionally approved writing appears here.</p>
        </div>
        <ArchiveFilter posts={posts} categories={categories} />
      </section>
    </main>
  );
}
