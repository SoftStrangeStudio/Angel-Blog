# Web Idea Brief — Held Here V1

## Goal

Create a trustworthy public home for personal writing about grief, chronic illness, bodily limitation, mental health, memory, love, and care.

## Audience

People who know the writer, readers carrying similar experiences, and visitors looking for honest personal writing. Some readers will encounter these stories for the first time.

## Concept

A private notebook opened carefully to the public. The interface behaves like a quiet archive: warm paper, visible editorial structure, modest physical imperfections, and no pressure to keep reading.

## Primary action

Choose a piece of writing and read it at a comfortable pace.

## Journey

Arrive → understand the archive's purpose → begin with a framing essay or choose a theme → read with a clear content note → continue, pause, or leave without friction.

## Architecture

- Home: purpose, featured beginning, themes, recent writing, reading-care note.
- Writing: filterable thematic archive and memory shelf.
- Article: metadata, content note, essay, related writing, quiet exit.
- About: why the archive exists, boundaries, and publishing practice.
- 404, RSS, sitemap, robots, and social metadata.

## Interactions

- Theme filters update archive results without a page reload.
- Query-string theme links open the archive to a relevant filter.
- Article reading progress provides quiet orientation.
- All motion respects reduced-motion preferences.

## Content

Six framing pieces use only experiences and intent explicitly provided by the writer. They introduce the archive without inventing private memories. Future personal stories are authored privately in Google Docs and published manually after review.

## Visual direction

Warm archival paper, dark brown-black ink, muted plum and moss accents, literary serif typography, small handwritten-style annotations, open margins, subtle fibers, and a simple pressed-botanical line motif. Pain is not made decorative.

## Responsive rules

- Desktop uses asymmetrical editorial grids and generous margins.
- Tablet simplifies to two-column or stacked compositions.
- Mobile preserves readable line lengths, visible navigation, and 44-pixel controls.
- No horizontal overflow or hidden primary navigation.

## Constraints and risks

- The repository is public; private drafts must remain in Google Docs.
- Public identity is provisional and centralized in one configuration file.
- The site cannot imply medical guidance, crisis support, or a complete account of the writer's life.
- Automated Google Docs publishing is intentionally deferred.

## Acceptance criteria

- Static Next.js export builds without errors.
- All V1 routes, metadata files, filters, content notes, related writing, RSS, and sitemap work.
- Five different aspect ratios render cleanly.
- Keyboard use, focus states, reduced motion, and readable contrast are supported.
- No Critical or unjustified High visual findings remain.
- Pushes to `main` deploy through GitHub Pages.

## Inferred, configurable decisions

- Working title: `Held Here`.
- Author label: `Angel`.
- Canonical URL: the SoftStrangeStudio GitHub Pages repository URL.
- No public contact form or comments in V1.
