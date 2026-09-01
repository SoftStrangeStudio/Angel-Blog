export type PostStatus = "published" | "draft" | "private" | "held-back";

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  category: string[];
  excerpt: string;
  contentNote?: string;
  coverImage?: string;
  featured: boolean;
  status: PostStatus;
  dedication?: string;
  memoryDate?: string;
  location?: string;
  relatedPosts?: string[];
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
  contentHtml: string;
};

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
