import type { Metadata } from "next";
import Link from "next/link";
import { MemoryMark } from "@/components/MemoryMark";

export const metadata: Metadata = {
  title: "Why this exists",
  description:
    "Why Held Here exists, how to approach its personal writing, and the boundaries around what is shared.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-intro page-shell page-intro--about" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">Why this exists</p>
          <h1 id="about-title">Some stories become heavier when they have nowhere to go.</h1>
        </div>
        <div className="page-intro__lede">
          <p>
            This is an outlet for grief, chronic illness, mental health, bodily limitation,
            memory, love, and care.
          </p>
          <p>
            For people who know me, some of these pages may be the first time they hear the
            stories I want to tell.
          </p>
        </div>
      </section>

      <section className="about-letter page-shell">
        <aside aria-hidden="true">
          <MemoryMark />
          <span className="hand-note">Not every truth arrives all at once.</span>
        </aside>
        <div className="prose prose--letter">
          <h2>A place to tell the truth without resolving it</h2>
          <p>
            I do not want every difficult experience polished into inspiration. Grief does
            not always teach a lesson. A body can have limits without becoming a metaphor.
            Mental health can be complicated without being turned into a clean before-and-after
            story.
          </p>
          <p>
            These pages can hold the unfinished parts. They can also hold warmth: a remembered
            detail, a small act of love, an ordinary day that mattered more than anyone knew.
          </p>
          <p>
            This archive is personal testimony, not a demand for agreement, advice, or an
            immediate conversation. Sharing one page does not mean I am ready to share every
            page.
          </p>
        </div>
      </section>

      <section className="boundaries-section" id="reading-boundaries" aria-labelledby="boundaries-title">
        <div className="page-shell boundaries-grid">
          <div>
            <p className="eyebrow">Reading &amp; boundaries</p>
            <h2 id="boundaries-title">What these pages ask of you</h2>
          </div>
          <ol className="boundary-list">
            <li>
              <span>01</span>
              <div>
                <strong>Read at your own pace.</strong>
                <p>Content notes are there so you can make an informed choice.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Do not treat a page as the whole story.</strong>
                <p>Each piece is one perspective at one moment in an ongoing life.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Let disclosure remain a choice.</strong>
                <p>Publication does not create an obligation to explain or discuss more.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Know the limits of this space.</strong>
                <p>This site is personal writing, not medical advice or crisis support.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="publishing-note page-shell" aria-labelledby="publishing-title">
        <div>
          <p className="eyebrow">A deliberate practice</p>
          <h2 id="publishing-title">Nothing is published automatically.</h2>
        </div>
        <div>
          <p>
            Writing begins privately in Google Docs. Every piece can remain unfinished,
            private, or held back. Only a consciously approved final version becomes part of
            this public archive.
          </p>
          <p>
            There are no public comments or contact form in this first version. Reading does
            not create access to the writer beyond what is offered on the page.
          </p>
          <Link className="button-link button-link--quiet" href="/writing/">
            Enter the archive <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
