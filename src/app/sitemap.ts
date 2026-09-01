import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/writing/"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/about/"), changeFrequency: "yearly", priority: 0.6 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/writing/${post.slug}/`),
    lastModified: post.updated ?? post.date,
    changeFrequency: "yearly",
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
