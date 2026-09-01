import Link from "next/link";
import { MemoryMark } from "@/components/MemoryMark";
import { PostCard } from "@/components/PostCard";
import { formatDate, getAllPosts, getFeaturedPost } from "@/lib/posts";

const themes = [
  {
    name: "Grief and Motherhood",
    note: "Loss, love, and the memories that refuse to become past tense.",
  },
  {
    name: "Living in a Limited Body",
    note: "What it means to negotiate with a body that has its own boundaries.",
  },
  {
    name: "Mental Health",
    note: "The inner weather, including the parts that are difficult to name.",
  },
  {
    name: "Love and Care",
    note: "Small gestures, ordinary tenderness, and reasons to keep noticing.",
  },
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = getFeaturedPost();
  const recent = posts.filter((post) => post.slug !== featured.slug).slice(0, 3);

  return (
    <main id="main-content">
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">A notebook opened carefully</p>
          <h1 id="hero-title">
            Some things need a place <em>to be held.</em>
          </h1>
          <p className="hero__lede">
            Personal writing about grief, illness, memory, mental health, limitation, love,
            and the ordinary moments that keep us here.
          </p>
          <div className="hero__actions">
            <Link className="button-link" href={`/writing/${featured.slug}/`}>
              Begin here <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/writing/">
              Browse the archive
            </Link>
          </div>
        </div>
        <aside className="hero__keepsake" aria-label="A note about this archive">
          <span className="tape" aria-hidden="true" />
          <MemoryMark />
          <p className="hand-note">There is no correct order for remembering.</p>
          <p>
            Read what you have room for. Pause when you need to. These pages will still be
            here.
          </p>
        </aside>
      </section>

      <section className="featured-section page-shell" aria-labelledby="begin-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Begin here</p>
            <h2 id="begin-heading">A door into the archive</h2>
          </div>
          <p>This first piece explains what this place holds—and what it asks of no one.</p>
        </div>

        <article className="featured-piece">
          <div className="featured-piece__margin" aria-hidden="true">
            <span>Read slowly</span>
          </div>
          <div className="featured-piece__content">
            <div className="post-meta">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{featured.readingTime} min read</span>
            </div>
            <h3>
              <Link href={`/writing/${featured.slug}/`}>{featured.title}</Link>
            </h3>
            <p>{featured.excerpt}</p>
            <ul className="category-list" aria-label="Themes">
              {featured.category.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <Link className="button-link button-link--quiet" href={`/writing/${featured.slug}/`}>
              Read the first piece <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="theme-section" aria-labelledby="themes-heading">
        <div className="page-shell">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">02 / Find a thread</p>
              <h2 id="themes-heading">The writing lives by feeling, not chronology.</h2>
            </div>
            <p>Choose the thread that meets you where you are today.</p>
          </div>
          <div className="theme-grid">
            {themes.map((theme, index) => (
              <Link
                className="theme-entry"
                href={`/writing/?theme=${encodeURIComponent(theme.name)}`}
                key={theme.name}
              >
                <span className="theme-entry__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <strong>{theme.name}</strong>
                  <small>{theme.note}</small>
                </span>
                <span className="theme-entry__arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="recent-section page-shell" aria-labelledby="recent-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Recent pages</p>
            <h2 id="recent-heading">Newly placed in the archive</h2>
          </div>
          <Link className="text-link" href="/writing/">
            See every piece <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="post-list">
          {recent.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="reading-care page-shell" aria-labelledby="care-heading">
        <MemoryMark compact />
        <div>
          <p className="eyebrow">Before you go further</p>
          <h2 id="care-heading">You are allowed to take care while reading.</h2>
          <p>
            Some pages carry content notes. They name difficult material plainly so you can
            decide whether now is the right time. Skipping a piece is always an available
            choice.
          </p>
        </div>
        <Link className="text-link" href="/about/#reading-boundaries">
          Read the boundaries
        </Link>
      </section>
    </main>
  );
}
