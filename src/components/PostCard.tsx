import Link from "next/link";
import type { PostMeta } from "@/lib/post-model";
import { formatDate } from "@/lib/post-model";

export function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  return (
    <article className="post-card">
      <div className="post-card__number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="post-card__body">
        <div className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3>
          <Link href={`/writing/${post.slug}/`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="post-card__footer">
          <ul className="category-list" aria-label="Themes">
            {post.category.slice(0, 2).map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
          <Link className="text-link" href={`/writing/${post.slug}/`}>
            Read this piece <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
