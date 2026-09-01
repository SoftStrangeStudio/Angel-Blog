import Link from "next/link";
import { publicBasePath, siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="eyebrow">A quiet boundary</p>
          <p className="footer-statement">
            These pages share personal experience. They are not medical advice, crisis support,
            or a complete account of a life.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/writing/">All writing</Link>
          <Link href="/about/">Reading &amp; boundaries</Link>
          <a href={`${publicBasePath}/rss.xml`}>RSS</a>
        </div>
        <p className="footer-credit">
          © {new Date().getFullYear()} {siteConfig.author}. Made as a place to keep what matters.
        </p>
      </div>
    </footer>
  );
}
