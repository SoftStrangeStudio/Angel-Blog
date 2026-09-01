import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const requiredFields = [
  "title",
  "slug",
  "date",
  "category",
  "excerpt",
  "featured",
  "status",
];
const allowedStatuses = new Set(["published", "draft", "private", "held-back"]);
const errors = [];

if (!fs.existsSync(postsDirectory)) {
  errors.push("content/posts does not exist.");
} else {
  const filenames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
  const posts = filenames.map((filename) => {
    const source = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
    const parsed = matter(source);
    return { filename, source, data: parsed.data, content: parsed.content.trim() };
  });

  const slugs = new Set();
  const publishedSlugs = new Set(
    posts.filter((post) => post.data.status === "published").map((post) => post.data.slug),
  );

  for (const post of posts) {
    const prefix = `${post.filename}:`;

    for (const field of requiredFields) {
      if (post.data[field] === undefined || post.data[field] === null || post.data[field] === "") {
        errors.push(`${prefix} missing required field \`${field}\`.`);
      }
    }

    const expectedSlug = post.filename.replace(/\.md$/, "");
    if (post.data.slug !== expectedSlug) {
      errors.push(`${prefix} slug must match filename (${expectedSlug}).`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(post.data.slug))) {
      errors.push(`${prefix} slug must use lowercase letters, numbers, and single hyphens.`);
    }
    if (slugs.has(post.data.slug)) errors.push(`${prefix} duplicate slug \`${post.data.slug}\`.`);
    slugs.add(post.data.slug);

    if (!allowedStatuses.has(post.data.status)) {
      errors.push(`${prefix} unsupported status \`${post.data.status}\`.`);
    }
    if (post.data.status !== "published") {
      errors.push(`${prefix} non-public content must remain in private Google Docs, not content/posts.`);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(post.data.date)) || Number.isNaN(Date.parse(post.data.date))) {
      errors.push(`${prefix} date must use a valid YYYY-MM-DD value.`);
    }
    if (post.data.updated && (!/^\d{4}-\d{2}-\d{2}$/.test(String(post.data.updated)) || Number.isNaN(Date.parse(post.data.updated)))) {
      errors.push(`${prefix} updated must use a valid YYYY-MM-DD value.`);
    }
    if (!Array.isArray(post.data.category) || post.data.category.length === 0) {
      errors.push(`${prefix} category must be a non-empty list.`);
    }
    if (typeof post.data.featured !== "boolean") {
      errors.push(`${prefix} featured must be true or false.`);
    }
    if (String(post.data.excerpt ?? "").length > 220) {
      errors.push(`${prefix} excerpt must be 220 characters or fewer.`);
    }
    if (String(post.data.contentNote ?? "").length > 240) {
      errors.push(`${prefix} contentNote must be 240 characters or fewer.`);
    }
    if (post.content.split(/\s+/).filter(Boolean).length < 80) {
      errors.push(`${prefix} published body must contain at least 80 words.`);
    }
    if (/\b(TODO|FIXME|LOREM IPSUM)\b/i.test(post.source)) {
      errors.push(`${prefix} contains unfinished placeholder language.`);
    }
    if (post.data.coverImage) {
      const imagePath = path.join(process.cwd(), "public", String(post.data.coverImage).replace(/^\//, ""));
      if (!fs.existsSync(imagePath)) errors.push(`${prefix} coverImage does not exist: ${post.data.coverImage}.`);
    }
    if (post.data.relatedPosts !== undefined && !Array.isArray(post.data.relatedPosts)) {
      errors.push(`${prefix} relatedPosts must be a list.`);
    }
    for (const relatedSlug of post.data.relatedPosts ?? []) {
      if (relatedSlug === post.data.slug) errors.push(`${prefix} cannot relate to itself.`);
      if (!publishedSlugs.has(relatedSlug)) {
        errors.push(`${prefix} related post is missing or unpublished: ${relatedSlug}.`);
      }
    }
  }

  const featuredPosts = posts.filter(
    (post) => post.data.status === "published" && post.data.featured === true,
  );
  if (featuredPosts.length !== 1) {
    errors.push(`Exactly one published post must be featured; found ${featuredPosts.length}.`);
  }

  if (errors.length === 0) {
    console.log(`Validated ${posts.length} published posts and all editorial relationships.`);
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}
