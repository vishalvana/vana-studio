import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="footer-grid">
        <div>
          <h4 className="mono">Based in</h4>
          <ul>
            {site.location.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mono">Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mono">Elsewhere</h4>
          <ul>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mono">Say hello</h4>
          <ul>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-big" aria-hidden>{site.name.toUpperCase()}</div>
      <div className="footer-base mono">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Built with Next.js, three.js and Rapier</span>
      </div>
    </footer>
  );
}
