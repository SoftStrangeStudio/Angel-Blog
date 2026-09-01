import Link from "next/link";
import { MemoryMark } from "@/components/MemoryMark";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found page-shell">
      <MemoryMark compact />
      <p className="eyebrow">404 / This page is not here</p>
      <h1>Some pages remain unwritten.</h1>
      <p>The address may have changed, or this piece may not be public.</p>
      <div className="hero__actions">
        <Link className="button-link" href="/writing/">
          Visit the archive
        </Link>
        <Link className="text-link" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
