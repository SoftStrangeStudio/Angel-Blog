import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Post, PostMeta, PostStatus } from "@/lib/post-model";

export type { Post, PostMeta, PostStatus } from "@/lib/post-model";
export { formatDate } from "@/lib/post-model";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function wordsIn(markdown: string) {
  return markdown
    .replace(/[#>*_`\[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function normalizeMeta(data: Record<string, unknown>, content: string): PostMeta {
  return {
    title: String(data.title),
    slug: String(data.slug),
    date: String(data.date),
    updated: data.updated ? String(data.updated) : undefined,
    category: Array.isArray(data.category) ? data.category.map(String) : [],
    excerpt: String(data.excerpt),
    contentNote: data.contentNote ? String(data.contentNote) : undefined,
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    featured: Boolean(data.featured),
    status: String(data.status) as PostStatus,
    dedication: data.dedication ? String(data.dedication) : undefined,
    memoryDate: data.memoryDate ? String(data.memoryDate) : undefined,
    location: data.location ? String(data.location) : undefined,
    relatedPosts: Array.isArray(data.relatedPosts) ? data.relatedPosts.map(String) : [],
    readingTime: Math.max(1, Math.ceil(wordsIn(content) / 210)),
  };
}

function parsePost(filename: string): Post {
  const fullPath = path.join(postsDirectory, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const meta = normalizeMeta(data, content);

  return {
    ...meta,
    content,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map(parsePost)
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.category))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const allPosts = getAllPosts().filter((candidate) => candidate.slug !== post.slug);
  const explicit = (post.relatedPosts ?? [])
    .map((slug) => allPosts.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is Post => Boolean(candidate));
  const thematic = allPosts
    .filter(
      (candidate) =>
        !explicit.some((item) => item.slug === candidate.slug) &&
        candidate.category.some((category) => post.category.includes(category)),
    )
    .sort((a, b) => {
      const aMatches = a.category.filter((category) => post.category.includes(category)).length;
      const bMatches = b.category.filter((category) => post.category.includes(category)).length;
      return bMatches - aMatches;
    });

  return [...explicit, ...thematic].slice(0, limit);
}
