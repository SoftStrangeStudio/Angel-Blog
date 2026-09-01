export const siteConfig = {
  name: "Held Here",
  author: "Angel",
  eyebrow: "A personal writing archive",
  description:
    "Personal writing about grief, chronic illness, mental health, memory, love, and the ordinary moments that keep us here.",
  url: "https://softstrangestudio.github.io/Angel-Blog",
} as const;

export const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
