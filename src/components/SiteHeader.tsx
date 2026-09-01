import Link from "next/link";
import { siteConfig } from "@/config/site";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "Why this exists" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to the writing
      </a>
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name}, home`}>
          <span className="wordmark__mark" aria-hidden="true">
            H
          </span>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>{siteConfig.eyebrow}</small>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="primary-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
