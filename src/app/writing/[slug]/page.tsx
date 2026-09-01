import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { ReadingProgress } from "@/components/ReadingProgress";
import { absoluteUrl, siteConfig } from "@/config/site";
import {
  formatDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/writing/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/writing/${post.slug}/`),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.author],
      tags: post.category,
      images: [
        {
          url: absoluteUrl("/og-default.png"),
          width: 1200,
          height: 630,
          alt: `${post.title} — ${siteConfig.name}`,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);

  return (
    <main id="main-content">
      <ReadingProgress />
      <article className="article page-shell">
        <header className="article-header">
          <Link className="back-link" href="/writing/">
            <span aria-hidden="true">←</span> Return to the archive
          </Link>
          <ul className="category-list" aria-label="Themes">
            {post.category.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <h1>{post.title}</h1>
          <p className="article-deck">{post.excerpt}</p>
          <div className="article-byline">
            <span>By {siteConfig.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          {post.dedication ? <p className="article-dedication">{post.dedication}</p> : null}
        </header>

        {post.contentNote ? (
          <aside className="content-note" aria-labelledby="content-note-title">
            <span aria-hidden="true">A note before reading</span>
            <div>
              <h2 id="content-note-title">Content note</h2>
              <p>{post.contentNote}</p>
            </div>
          </aside>
        ) : null}

        <div
          className="prose article-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <footer className="article-ending">
          <p className="hand-note">You can leave this page here.</p>
          <p>
            Thank you for reading what I was ready to share. There is no expectation to solve
            it, explain it back to me, or keep going today.
          </p>
          <Link className="text-link" href="/writing/">
            Return to all writing <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </article>

      {related.length ? (
        <section className="related-section page-shell" aria-labelledby="related-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Related threads</p>
              <h2 id="related-heading">If you have room for another page</h2>
            </div>
          </div>
          <div className="post-list">
            {related.map((relatedPost, index) => (
              <PostCard key={relatedPost.slug} post={relatedPost} index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
