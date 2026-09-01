# Held Here

`Held Here` is a private-notebook-inspired writing archive for grief, chronic illness, mental health, memory, love, and care.

The website publishes only intentionally approved Markdown files. Google Docs remains the private drafting and revision space; nothing is pulled from Google Docs automatically.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Validation

```bash
npm run check
npm run build
npm run start:static
```

`npm run check` validates TypeScript and every published post's frontmatter, relationships, dates, and status. `npm run build` produces the static site in `out/`.

## Publishing an article

1. Draft privately in Google Docs using [the writing template](docs/GOOGLE-DOCS-WRITING-TEMPLATE.md).
2. Complete the privacy and relationship review in [the publishing workflow](docs/PUBLISHING-WORKFLOW.md).
3. Copy only the final approved writing into `content/posts/<slug>.md`.
4. Set `status: published` only after the publication decision is explicit.
5. Run `npm run check && npm run build` before committing.

Private drafts must never be stored in this public repository.

## Site identity

The title, author label, canonical URL, and description live in `src/config/site.ts`. They are intentionally centralized so the provisional public identity can be changed without touching the page layouts.

## Deployment

`.github/workflows/deploy.yml` builds and deploys the static export to GitHub Pages whenever `main` changes. The configuration accounts for the `/Angel-Blog` repository subpath.

## Project structure

```text
content/posts/                 approved public writing
docs/                          private-to-public editorial guidance
src/app/                       pages, metadata, RSS, and sitemap
src/components/                reusable editorial components
src/config/site.ts             public identity and canonical URL
src/lib/posts.ts               Markdown loading and content model
scripts/validate-content.mjs   publication safeguards
scripts/serve-static.mjs       production-export preview server
```
