# Publishing Workflow

Google Docs is the private source of truth while writing. The public repository contains only approved final text.

## Status path

```text
Idea → Drafting → Revising → Ready for review → Approved for publication → Published
                     ↘ Private / Held back
```

No status advances automatically.

## Publication review

Before moving a piece to `Approved for publication`, confirm:

1. **Personal readiness** — publication is a choice, not an obligation to explain.
2. **Privacy** — names, dates, locations, medical details, and identifying combinations have been reviewed.
3. **Shared stories** — another person's private experience is not exposed simply because it intersects with the writer's life.
4. **Content note** — difficult material is described briefly and plainly where needed.
5. **Boundaries** — the writer has decided whether and how they are willing to discuss the piece afterward.
6. **Final text** — comments, suggestions, private planning notes, and revision history are not copied into the repository.

## Manual site handoff

1. Create `content/posts/<slug>.md`.
2. Add the validated frontmatter fields.
3. Paste the final approved article below the frontmatter.
4. Add only public images to `public/images/` and remove embedded private metadata when appropriate.
5. Set `status: published`.
6. Run `npm run check && npm run build`.
7. Read the generated article once in the browser before committing.

## Content-note standard

Use one calm sentence naming the material a reader will encounter. Do not summarize the emotional conclusion or sensationalize it.

Examples:

- `This piece discusses grief and the death of a parent.`
- `This piece references chronic illness, hospitals, and bodily distress.`
- `This piece discusses depression and suicidal thoughts.`

## Repository boundary

Never commit private drafts, exported Google Docs, comments, revision histories, medical records, or unpublished photographs. Removing a file from a later commit does not remove it from public Git history.
